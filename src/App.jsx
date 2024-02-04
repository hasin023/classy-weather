import React from "react"
import Page from "./layout/Page"
import SearchCity from "./components/SearchCity";

// function App() {
//   return (
//     <Page>
//       <div>
//         Goodbye World
//       </div>
//     </Page>
//   )
// }

class App extends React.Component {

  render() {
    return (
      <Page>
        <SearchCity />
      </Page >
    )
  }
}


export default App
