import satori, { SatoriOptions } from "satori";
import { SITE } from "~/config";
import { writeFile } from "node:fs/promises";
// import { Resvg } from "@resvg/resvg-js";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const ogImage = (text: string) => {
  return (
    <div
      style={{
        background: "#fefbfb",
        width: "100%",
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          border: "4px solid #000",
          background: "#ecebeb",
          opacity: "0.9",
          "border-radius": "4px",
          display: "flex",
          "justify-content": "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />

      <div
        style={{
          border: "4px solid #000",
          background: "#fefbfb",
          "border-radius": "4px",
          display: "flex",
          "justify-content": "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "justify-content": "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            style={{
              "font-size": "72",
              "font-weight": "bold",
              "max-height": "84%",
              overflow: "hidden",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              "justify-content": "space-between",
              width: "100%",
              "margin-bottom": "8px",
              "font-size": "28",
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", "font-weight": "bold" }}>{SITE.author}</span>
            </span>

            <span style={{ overflow: "hidden", "font-weight": "bold" }}>{SITE.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

// const generateOgImage = async (mytext = SITE.title) => {
//   const svg = await satori(ogImage(mytext), options);

//   // render png in production mode
//   if (import.meta.env.MODE === "production") {
//     const resvg = new Resvg(svg);
//     const pngData = resvg.render();
//     const pngBuffer = pngData.asPng();

//     console.info("Output PNG Image  :", `${mytext}.png`);

//     await writeFile(`./dist/${mytext}.png`, pngBuffer);
//   }

//   return svg;
// };

// export default generateOgImage;
