// vamos a usar API de https://rapidapi.com/ de youtube

const API =
  "https://youtube-v3-alternative.p.rapidapi.com/channel?id=UCM3fhtajhwVWFw2wqJkVA-Q&sort_by=newest";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7b8c7066d5msh8d8509b9d89f97fp1e22acjsnb6ff6cbd25b5",
    "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
  },
};

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

// vamos a crear una funcion que se llame a si misma

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.data
      .map((video) => {
        console.log(video.videoId);
        return `
        <a href="https://www.youtube.com/watch?v=${video.videoId} target=_blank ">
        <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img src="${video.thumbnail[0].url}" alt="${video.title}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.title}
              </h3>
            </div>
        </div></a>
    `;
      })
      .slice(0, 4)
      .join("")}
        
    `;

    content.innerHTML = view;
  } catch (error) {
    console.log("error");
  }
})();
