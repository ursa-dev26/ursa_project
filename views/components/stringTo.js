class StringTo {
    constructor() { }


   static ucfirst = (string) => {
        return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }

   static upercase = (string) => {
        return string?.toUpperCase();
    }
}


export default StringTo