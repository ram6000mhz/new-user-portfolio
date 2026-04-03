import { render } from "preact";

export const createIconBitmap = async (iconComponent, objectColor) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = objectColor;
    ctx.fillRect(0, 0, 512, 512);

    const container = document.createElement("div");
    render(iconComponent, container);
    const svg = container.querySelector("svg");
    if (svg) {
      svg.setAttribute("width", "400");
      svg.setAttribute("height", "400");
      svg.setAttribute("stroke", "white");
    }

    const svgData = new XMLSerializer().serializeToString(svg || document.createElement("svg"));
    render(null, container);

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        ctx.drawImage(img, 56, 56, 400, 400);
        URL.revokeObjectURL(url);
        const bitmap = await createImageBitmap(canvas);
        resolve(bitmap);
      };
      img.src = url;
    });
};