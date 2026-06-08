
const selectedFlowers = JSON.parse(sessionStorage.getItem("selectedFlower")) || [];
const selectedPaper = sessionStorage.getItem("selectedPaper") || null;



const buketButonu = document.getElementById("generateBtn");

    //base64 çeviren fonksiyon 
    function getBase64FromImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                resolve(canvas.toDataURL("image/png"));
            };

            img.onerror = reject;
            img.src = src;
        });
    }

    async function convertSelectedFlowers() {
    const base64Images = [];

    for (const id of selectedFlowers) {
        const flower = flowers.find(f => f.id == id);

        if (flower) {
            const base64 = await getBase64FromImage(flower.image);
            base64Images.push(base64);
        }
    }

    console.log(base64Images);
        return base64Images;

}




async function convertSelectedPaper() {

    const paper = papers.find(p => p.id == selectedPaper);

    if (paper) {
        const base64 = await getBase64FromImage(paper.image);
        console.log(base64);
        return base64;
        
    }
}

buketButonu.addEventListener("click", async ()=>{

    const flowersBase64 = await convertSelectedFlowers();
    const paperBase64 = await convertSelectedPaper();

    const contents =
    [
        {
            text: "Create a bouquet using these flowers and use the wrapping paper image for the bouquet."
        }
    ];

    flowersBase64.forEach(base64 => {
        contents.push({
            inlineData: {
                mimeType: "image/png",
                data: base64.replace(/^data:image\/\w+;base64,/, "")
            }
        });
    });

    contents.push({
        inlineData: {
            mimeType: "image/png",
            data: paperBase64.replace(/^data:image\/\w+;base64,/, "")
        }
    });

    console.log(contents);


    console.log("base64 çalişiyor");


    const API_KEY = "AIzaSyCTtytbOsDcypk5d8xochL1dXdSIDUQ_xk";

    
    
    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are an expert frontend developer and floral designer. Create a beautiful, layered, and modern HTML and CSS structure that visually combines the provided flower images into a single, cohesive bouquet composition. \n\n" +
      "CRITICAL RULE: For the <img> tags, you MUST use the exact raw Base64 data provided in the inlineData parts as the src (e.g., <img src=\"data:image/png;base64,...\">). Do NOT look up or use any external URLs or Imgur links. The flowers must overlay naturally using 'position: absolute', 'z-index', and 'transform: rotate()' to look like a real bouquet inside the wrapping paper wrapper.\n\n" +
      "Return ONLY pure HTML with inline styles or a <style> tag. Do NOT include markdown code blocks like ```html."
            },

            ...flowersBase64.map(img => ({
              inlineData: {
                mimeType: "image/png",
                data: img.replace(/^data:image\/\w+;base64,/, "")
              }
            })),

            {
              inlineData: {
                mimeType: "image/png",
                data: paperBase64.replace(/^data:image\/\w+;base64,/, "")
              }
            }
          ]
        }
      ]
    })
  }
);

// 👇 BURASI EKSİK OLAN KISIM
const data = await response.json();
console.log("Gemini response:", data);
try {
    if (data.candidates && data.candidates[0].content.parts[0].text) {
        // Gemini'den gelen HTML/CSS kodunu alıyoruz
        const generatedHtml = data.candidates[0].content.parts[0].text;
        
        // HTML alanına bu kodu enjekte ediyoruz
        const previewArea = document.getElementById("bouquetPreview");
        previewArea.innerHTML = generatedHtml;
        
        console.log("Buket başarıyla oluşturuldu ve ekrana basıldı!");
    } else {
        console.error("Gemini tasarım kodunu üretemedi, dönen veri:", data);
    }
} catch (error) {
    console.error("Arayüze basarken bir hata oluştu:", error);
}
});



