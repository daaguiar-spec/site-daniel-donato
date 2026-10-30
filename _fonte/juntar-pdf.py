# Junta as imagens de /tmp/pdf-apres num PDF (uma seção por página, sem cortes).
import glob, sys
from PIL import Image
fs = sorted(glob.glob('/tmp/pdf-apres/*.png'))
ims = []
for f in fs:
    im = Image.open(f).convert('RGB')
    if im.width > 2000:
        im = im.resize((2000, round(im.height * 2000 / im.width)), Image.LANCZOS)
    ims.append(im)
out = sys.argv[1] if len(sys.argv) > 1 else 'apresentacao/apresentacao-daniel-donato.pdf'
ims[0].save(out, save_all=True, append_images=ims[1:], resolution=150, quality=78, optimize=True)
print(out, len(ims), 'páginas')
