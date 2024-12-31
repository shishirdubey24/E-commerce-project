# React + Vite

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
