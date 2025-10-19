date 07-11-2024 (Library )
error1::
file doesnot exist ->
solution:: pagle to import check karo ki vs code is giving some info about the file or not if not then may be file ki naming me problem ho ya agr wo depencency hai to may be it is not installed in proper way
means Naming convension,,import export statements ka sahi hona,if Dependency then installation..

error2:: import me {} ke andr aur bahar likhne me kya difference??

Fetchiem.jsx` FILE:::

useSelector hook is used to fetch the deta from redux store useSelector(fun>=deta layega)..

exmaple::: const fetchStatus = useSelector((store) => store.fetchStatus);

use of redux store:::
its centralized store which can be accessed by any component. as like we avoid prop drilling fro deeply nested components. and 2nd use is that it can manage those states which will be accessed by multiple components...

date 27-05-2025
1 today i have integrated the Service Worker into my project .
2:: what i understood about this sw.js file today is that it recognises the network call is it online or offline --> OFFLINE::?->

Offline it will show the Fallback UI <(??How it will know this netwok call is offline i will figure it out and write it here currently dont know )

ONLINE --> Load the app

3:: if its OFFLINE then you will need a React Hook to show something on UI without compo SW.js file will be in background and UI Screen will be Blank
so to show something have to write a Hook--> it means Now main.jsx file will be cahnged in some mnanner with a condition
::->

    date --::28-05-2025

their is correction into line 22 , i was thinking that SW is the whole sole manager of our APP and it remains in background and somehow its connected with useOnlineStatus () file as well but its only 40% true
1::--> SW and that file both are not dependent to each other both are just reacting to same situaTION !
SW know the status of Network by itslef not from browser what is does first try to fetch whole APP if it fails then it goes on Fallabck UI
p@::> then what it does it protect APP from crashing (404 error) it loads cached files which it had inside Assets

2::--> that offlineStatus file gets event of offline from browser then it loads error message on UI

summery ;; SW prevents from crashing loads the page + Status File shows message on UI
both works together but dont communicate to each other or not dependent

09-06-2025
today i ma going to explore the Role based Access System inside our project .i want to build Admin dashboard
step1::--> somehow i need label of user which can verify that its admin
1:: added AUTH preference inside AUTH
2:: just checked pref key and role in the browser

- point:: make another collection and then add attributes of user profile lets say role ,user type etc. etc.

step2::--> Now we have to develpoe the admin dashboard from UI Perspective

10-06-2025::--> admin dashboard design
it has been completed on structer level but needs 1 more day
1:: while creating specific css file i think vs code dont suggest you the css file nmae so import it and then try to enter from jsx file to enter into css fle

2:: while connecting routes always cross check if you have given a tab for it,give same /url there also otherwise 404 error

NEXT goal::-> admin dashboard Css is not working as intented
so will improve it but dont know actual pain point i mean why its looking so ugly ,but will figure out

date 17-06-2025
i have fetched data inside the new file under hokks folder,now i ma thinking that 1:: where we will show <shimmerUI/> compo.??
2:: agar hamne isi file me shimmer UI dikhaya to kya ye file apna sole purpose loose nahi kar degi ?? kyuki hum 1 file me sirf 1 kaam hi karana sikh rahe hain..??

2::-> UI folder ke andar maine 1 file bnayi.

date 29/08/2025
working with index.html file of hte project . today i had added the favicon or i would say ,today i have added the icon into my project and changed its title name also. what i learn new about it is this is the file where we write metadata as export for SEO relted stuff

date 12/10/2025
1.data fetching with page and items limit , have stopped the defult behaviour of react query 2. 2. app.post("/fetch",fetchRouter)//its wrong app.use is correct reason pta karna hai ?? 3.

3. Error: ENOENT: no such file or directory, open 'C:\vite-project\myntra-react-project\actual-backend\Controller\items.json'
   at Object.readFileSync (node:fs:442:20)
   at getData (file:///C:/vite-project/myntra-react-project/actual-backend/Controller/Data/GetData.js:16:21)

Date==>19-10-2025

1. Performace improvment,it has many parts in frontend ,backend,network,browser
2. in frontend part, we have paggination so that browser does not get overvhlemed with products..
3. we also have lazy loading technique which loads the content as per scroll.
4. now there comes the backend part issue can be
   1. express is slow,2. images are being served one by one . 3. caching headers are missing.
5. now we will move to the backend part issues
