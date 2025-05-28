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
