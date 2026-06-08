const flowers = [
    {id: 1 , image: "picture/flowers/1.png", name:"mavi çiçek"},
    {id: 2, image: "picture/flowers/2.png", name:"cirtlak pembe"},
    {id: 3, image: "picture/flowers/3.png", name:"beyaz"},
    {id: 4, image: "picture/flowers/4.png", name:"tozpembe"},
    {id: 5, image: "picture/flowers/5.png", name: "yaldizli"},
    {id: 6, image: "picture/flowers/6.png", name:"pembe"},
    {id: 7, image: "picture/flowers/7.png", name:"narcicegi"},
    {id: 8, image: "picture/flowers/8.png", name:"sari"},
    {id: 9, image: "picture/flowers/9.png", name:"papatya"},
    {id: 10, image: "picture/flowers/10.png", name:"uzunyapraklimor"},
    {id: 11, image: "picture/flowers/11.png", name:"acikmor"},
    {id: 12, image: "picture/flowers/12.png", name:"kirmizi" }

];
const papers = [
    {id: "a",image: "picture/paper/çiçekdesenli.png" },
    {id: "b",image: "picture/paper/green.png"},
    {id: "c",image: "picture/paper/greey.png"},
    {id: "d",image: "picture/paper/orangeprincess.png"},
    {id: "e",image: "picture/paper/pembeprincess.png"},
    {id: "f",image: "picture/paper/red.png"},
    {id: "g",image: "picture/paper/suluboyaeffect.png"}
];

//sayfa yenilenirse veriler silinir 
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    sessionStorage.removeItem("selectedFlower");
    sessionStorage.removeItem("selectedPaper");
    console.log("Sayfa yenilendiği için seçimler sıfırlandı.");
}


// seçilen çiçeklerin id lerini almak için
// ─── FLOWER.HTML ───────────────────────────────────────────────
const flowerImgs = document.querySelectorAll(".flower img");

if (flowerImgs.length > 0) {
    const flowerss = document.querySelectorAll(".flower img");
    const selectedFlowers = JSON.parse(sessionStorage.getItem("selectedFlower")) || [] ;


    flowerss.forEach(flower => {
        flower.addEventListener("click",()=> {
            const id = Number(flower.id);
            
            if (!selectedFlowers.includes(id))
            {
                selectedFlowers.push(id);
                sessionStorage.setItem("selectedFlower",JSON.stringify(selectedFlowers)) //stringfy ile dizi olarak gömüyoruz
                
            }
            
        })
    })

    // seçildiğinde sağ üstünde sayaç çıkması için
    const veriable = document.querySelectorAll(".flower");

    veriable.forEach (flower => {
        let count = 0;

        flower.addEventListener("click",()=> {
            count++;
            
            let badge = flower.querySelector(".count");


            if(badge==null)
            {
                badge = document.createElement("div");
                badge.classList.add("count")

                flower.appendChild(badge);

            }
            badge.textContent = count;
        });
        

    })

}

// ─── PAPER.HTML ────────────────────────────────────────────────
const paperImgs = document.querySelectorAll(".paper img");

if (paperImgs.length > 0) {


    paperImgs.forEach (pape => {
        pape.addEventListener("click",()=>{
            selectedPaper= pape.id;
            sessionStorage.setItem("selectedPaper",selectedPaper)
            console.log(selectedPaper);
        })
    })



    // seçildiğinde sağ üstünde işaret çıkması için
    const veriable2 = document.querySelectorAll(".paper");
    let count = 0;
    veriable2.forEach (paper => {

        paper.addEventListener("click",()=> {
            const oldBadges = document.querySelectorAll(".isaret");
            oldBadges.forEach(oldBadge => {
                oldBadge.remove(); // Hepsini ortadan kaldırıyoruz
            });

            //Tıklanan kağıda yeni işaret eklenir
            let badge = document.createElement("div");
            badge.classList.add("isaret");
            badge.textContent = "✓"; // Senin istediğin işaret karakteri

            paper.appendChild(badge);

            console.log("Seçilen kağit ID:", paper.querySelector("img").id);
        });
        

    })

}
// ───────────────────────────────────────────────


// ─── SONUC.HTML ────────────────────────────────────────────────


