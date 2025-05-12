import dynamic	 from "next/dynamic";

const Map=dynamic(()=> import ("./Hospital/HospitalMap"),{
    ssr:false
})

export default Map