import Footer from "./components/Footer"
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./Home"
import logo from "./assets/logo.png"

function App() {

  return (
    <ThemeProvider>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5  dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="max-w-[85rem] px-4 sm:px-6 lg:px-8 flex basis-full justify-start items-center w-full mx-auto">
          <div className="me-2">
            <a className="flex items-center rounded-md text-xl font-semibold focus:outline-none focus:opacity-80" 
            href="https://www.teamrevanta.in/" target="_blank" aria-label="Preline">
              <img height={42} width={42} src={logo} />
              <h1 className="text-sm text-gray-600">Go to official site</h1>
            </a>
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Home />
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default App
