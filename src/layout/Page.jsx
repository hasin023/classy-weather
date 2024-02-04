import React from "react";


// function Page({ children }) {
//     return (
//         <div className="flex justify-center items-center text-4xl h-svh text-[#222] bg-[#eabfb9] font-Cinzel_Decorative">
//             {children}
//         </div>
//     )
// }

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex justify-center items-center text-3xl h-svh text-[#222] bg-[#eabfb9] font-Cinzel_Decorative">
                {this.props.children}
            </div>
        )
    }
}

export default Page
