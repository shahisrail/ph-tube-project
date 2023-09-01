 const allCatagory = async () => {
  const response = await fetch(
    " https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabcontainer = document.getElementById('tab-container')
  data.data.forEach((Catagory) => {
    console.log(Catagory);
    const div = document.createElement("div")
    div.innerHTML = `
     <button onclick="hanldelLoadData('${Catagory.category_id}')" class = "btn hover:bg-[#FF1F3D]">${Catagory.category}</button>
    `
    tabcontainer.appendChild(div)
  });
  console.log(data.data);
};

const convertMinutesToHoursAndMinutes = (totalMinutesString) => {
  const totalMinutes = parseInt(totalMinutesString);
  if (isNaN(totalMinutes)) {
    return "";
  }

  const hours = Math.floor(totalMinutes / 3600);
  const minutes = Math.floor((totalMinutes % 3600) / 60);

  return `${hours} hours ${minutes} minutes`;
};
const hanldelLoadData = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const data = await response.json()

  const cradContainer = document.getElementById('crad-container');
  cradContainer.innerHTML = "";
  if (!data.data || data.data.length === 0) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
            
  <div class="grid grid-cols-1 p-[1.5rem] text-center">
      <img class=" ml-[8rem] lg:ml-[184%] md:ml-[16rem]" src="error.png" alt="Error" class="error-image">
      <p class="text-center w-[400px] md:ml-[8rem] lg:ml-[150%] mt-5 text-3xl">Oops!! Sorry, There is no content here</p>
  </div>
            `;
    cradContainer.appendChild(errorDiv);

  }
  else {
    data.data.forEach((details) => {
      console.log(details);
      const div = document.createElement('div');
      div.innerHTML = `
    <div class="card h-[400px]  bg-base-100 shadow-xl">
      <figure>
          <img class="h-[400px]  " src="${details?.thumbnail}" alt="">
      </figure>
           <div class=" relative  justify-end">
            <h2 class = "" font-semibold style="background-color: black;  color: white; width: 155px;  position: relative;  text-align: center; left:190px; top:-32px;">
              ${convertMinutesToHoursAndMinutes(details?.others?.posted_date)}
            </h2>
          </div>
          <div class="card-body">
          <div class="flex mb-5">
            <div>
              <div class="avatar online">
                <div class="w-14 rounded-full">
                  <img src="${details?.authors[0]?.profile_picture}" alt="${details?.authors[0]?.name}">
                </div>
              </div>
            </div>
            
            <div class="ml-3 flex flex-col">
              <div>
                <h2 class="card-title mt-2">${details?.title}</h2>
              </div>
              <div class="flex items-center mt-2">
                <h2 class="mr-2">${details?.authors[0]?.profile_name}</h2>
                ${details?.authors[0]?.verified ? '<img src="verify-blue.png" alt="Verified" />' : ''}
              </div>
               <h2 class="ml-[0.25rem]">${details.others.views}</h2>
                
    
             </div>
          </div>
        </div>
      </div>
    `
      cradContainer.appendChild(div)
    })
  }

}

allCatagory()
hanldelLoadData('1000')


