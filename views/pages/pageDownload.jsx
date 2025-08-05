import { Route, Routes } from "react-router-dom"
import HomeDownloader from "../components/Download/home"

const PageDownload = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeDownloader />} />
        </Routes>
    )
}

export default PageDownload