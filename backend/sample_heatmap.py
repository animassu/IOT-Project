from heatmappy import Heatmapper

from PIL import Image

example_points = [(295, 900), (295, 899), (298, 898), (643, 750), (643, 749)]
example_img_path = 'shopping-mall.jpg'
example_img = Image.open(example_img_path)

heatmapper = Heatmapper()
heatmap = heatmapper.heatmap_on_img(example_points, example_img)
heatmap.save('../myapp/public/heatmap.png')