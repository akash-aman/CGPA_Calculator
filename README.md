# **CGPA Calculator 🚀**

- This 🤖app Calculate📝 CGPA & SGPA.💯
- Project is based on VTU CGPA Calculation Formula➗.

![Untitled](https://raw.githubusercontent.com/akash-aman/CGPA_Calculator/main/image/img2.png)

![Untitled](https://raw.githubusercontent.com/akash-aman/CGPA_Calculator/main/image/img4.png)

## **Idea about building this Project**

- Calculating CGPA is some time irritating 🤓 so thought of building one Application which include User Interactivity ❤️ & user Flexiblity . 
- Developing this app using ⚛️ React & Redux was fun & challenging.
- Main logic of this app is in `state/cgpaSlice.js` file.
- A much interactive UI💻, we can add more subjects, remove subjects, change the subjects marks💯, even add & remove semesters Card etc.



## Run with Docker

```
docker build . -t cgpa
```

```
docker container run -p 3000:3000 -d --name cgpa cgpa
```

## Run with Docker Compose

- First Create my_network  

```
docker network create my_network
```


### Development build with docker compose

- Run Container 

```
docker-compose -f .\docker-compose.dev.yml up -d
```

- Stop Container

```
docker-compose -f .\docker-compose.dev.yml down
```

### Production build with docker compose 

- Run Container 

```
docker-compose -f .\docker-compose.prod.yml up -d
```

- Stop Container

```
docker-compose -f .\docker-compose.prod.yml down
```

## How to run 

- Installing pnpm 
```
    npm install -g pnpm
```
- Installing pnpm dependencies
```
    pnpm install 
```
- Run in Development Mode  
```
    pnpm run dev
```
- Run in Production Mode 
```
    pnpm run build
    pnpm run start
```



## Image


![Untitled](https://raw.githubusercontent.com/akash-aman/CGPA_Calculator/main/image/img1.png)

![Untitled](https://raw.githubusercontent.com/akash-aman/CGPA_Calculator/main/image/img3.png)

