import cv2, numpy as np, sys
from PIL import Image, ImageFilter, ImageEnhance
bg=cv2.imread('/home/claude/site-daniel-donato/img/daniel-equipe.webp')
H,W=bg.shape[:2]
m=np.zeros((H,W),np.uint8)
cv2.ellipse(m,(794,300),(115,150),0,0,360,255,-1)
pts=np.array([[700,400],[890,400],[1050,470],[1060,H],[530,H],[540,470]],np.int32)
cv2.fillPoly(m,[pts],255)
m=cv2.dilate(m,np.ones((15,15),np.uint8))
clean=cv2.inpaint(bg,m,25,cv2.INPAINT_TELEA)
cv2.imwrite('clean.png',clean)
bgp=Image.fromarray(cv2.cvtColor(clean,cv2.COLOR_BGR2RGB)).convert('RGBA')
p=Image.open('/root/.claude/uploads/42acd41f-2bef-5add-8f99-8f3a41a164b4/aefdf333-image.png').crop((187,37,1880,2048))
s=float(sys.argv[1]) if len(sys.argv)>1 else 0.36
p=p.resize((int(p.width*s),int(p.height*s)),Image.LANCZOS)
# grade: darker, warmer, lower contrast for moody look
rgb=p.convert('RGB'); a=p.getchannel('A')
rgb=ImageEnhance.Brightness(rgb).enhance(0.86); rgb=ImageEnhance.Contrast(rgb).enhance(0.95); rgb=ImageEnhance.Color(rgb).enhance(0.9)
r,g,b=rgb.split(); r=r.point(lambda v:min(255,int(v*1.04))); b=b.point(lambda v:int(v*0.9))
rgb=Image.merge('RGB',(r,g,b))
# bottom fade to transparent-to-black
fade=Image.new('L',p.size,255)
import math
for y in range(p.height):
    t=y/p.height
    v=255 if t<0.55 else int(255*max(0,1-(t-0.55)/0.4)**1.3)
    fade.paste(v,(0,y,p.width,y+1))
from PIL import ImageChops
p=rgb.convert('RGBA'); p.putalpha(ImageChops.multiply(a.filter(ImageFilter.GaussianBlur(1.2)),fade)); a=p.getchannel('A')
# rim light glow behind
x=W//2-p.width//2; y=int(sys.argv[2]) if len(sys.argv)>2 else 150
glow=Image.new('RGBA',bgp.size,(0,0,0,0))
ga=Image.new('L',bgp.size,0); ga.paste(a.filter(ImageFilter.GaussianBlur(25)),(x,y))
glow=Image.new('RGBA',bgp.size,(255,190,120,0)); glow.putalpha(ga.point(lambda v:int(v*0.35)))
out=Image.alpha_composite(bgp,glow); out=Image.alpha_composite(out,Image.new('RGBA',bgp.size,(0,0,0,0)))
out.alpha_composite(p,(x,y))
# re-darken bottom like original
out=out.convert('RGB')
gr=Image.new('L',(W,H),0)
for yy in range(H):
    t=yy/H
    gr.paste(int(255*min(1,max(0,(t-0.62)/0.33))**1.2),(0,yy,W,yy+1))
out=Image.composite(Image.new('RGB',(W,H),(6,5,4)),out,gr); out.save('novo.png'); out.save('daniel-equipe-novo.webp',quality=86)
out.resize((W//2,H//2)).save('novo-small.png')
