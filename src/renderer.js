/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Route, Routes} from 'react-router';
import {createUseStyles} from 'react-jss';
import Themer from './components/common/themer';
import Layout from "./components/layout";
import Welcome from './content/welcome';
import ProductList from "./content/product/product-list";
import Product from "./content/product/product";
import ProductForm from './content/product/product-form';
import SalvageList from './content/salvage/salvage-list';
import CustomList from './content/custom/custom-list';
import TagList from './content/tag/tag-list';

import urbanIcons from "./assets/icons/UrbanIcons.woff";
import trajanBlack from "./assets/fonts/trajan/TrajanBlack.otf";
import trajanBold from "./assets/fonts/trajan/TrajanBold.otf";
import trajanSemibold from "./assets/fonts/trajan/TrajanSemibold.otf";
import trajanRegular from "./assets/fonts/trajan/TrajanRegular.otf";
import trajanLight from "./assets/fonts/trajan/TrajanLight.otf";
import trajanExtraLight from "./assets/fonts/trajan/TrajanExtraLight.otf";
import universExtraBlack from "./assets/fonts/univers/UniversExtraBlack.otf";
import universExtraBlackOblique from "./assets/fonts/univers/UniversExtraBlackOblique.otf";
import universBlack from "./assets/fonts/univers/UniversBlack.otf";
import universBlackOblique from "./assets/fonts/univers/UniversBlackOblique.otf";
import universBold from "./assets/fonts/univers/UniversBold.otf";
import universBoldOblique from "./assets/fonts/univers/UniversBoldOblique.otf";
import universRoman from "./assets/fonts/univers/UniversRoman.otf";
import universRomanOblique from "./assets/fonts/univers/UniversRomanOblique.otf";
import universLight from "./assets/fonts/univers/UniversLight.otf";
import universLightOblique from "./assets/fonts/univers/UniversLightOblique.otf";


const fonts = createUseStyles({
    "@font-face": [
        {
            fontFamily: "UrbanIcons",
            src: `url(${urbanIcons})`
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanBlack})`,
            fontWeight: "700"
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanBold})`,
            fontWeight: "600"
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanSemibold})`,
            fontWeight: "500"
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanRegular})`,
            fontWeight: "400"
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanLight})`,
            fontWeight: "300"
        },
        {
            fontFamily: "Trajan",
            src: `url(${trajanExtraLight})`,
            fontWeight: "200"
        },
        {
            fontFamily: "Univers",
            src: `url(${universExtraBlack})`,
            fontWeight: "800",
            fontStyle: "normal"
        },
        {
            fontFamily: "Univers",
            src: `url(${universExtraBlackOblique})`,
            fontWeight: "800",
            fontStyle: "oblique"
        },
        {
            fontFamily: "Univers",
            src: `url(${universBlack})`,
            fontWeight: "700",
            fontStyle: "normal"
        },
        {
            fontFamily: "Univers",
            src: `url(${universBlackOblique})`,
            fontWeight: "700",
            fontStyle: "oblique"
        },
        {
            fontFamily: "Univers",
            src: `url(${universBold})`,
            fontWeight: "600",
            fontStyle: "normal"
        },
        {
            fontFamily: "Univers",
            src: `url(${universBoldOblique})`,
            fontWeight: "600",
            fontStyle: "oblique"
        },
        {
            fontFamily: "Univers",
            src: `url(${universRoman})`,
            fontWeight: "400",
            fontStyle: "normal"
        },
        {
            fontFamily: "Univers",
            src: `url(${universRomanOblique})`,
            fontWeight: "400",
            fontStyle: "oblique"
        },
        {
            fontFamily: "Univers",
            src: `url(${universLight})`,
            fontWeight: "300",
            fontStyle: "normal"
        },
        {
            fontFamily: "Univers",
            src: `url(${universLightOblique})`,
            fontWeight: "300",
            fontStyle: "oblique"
        }
    ]
});

function App() {
    fonts();

    return (
        <Themer>
            <HashRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="products">
                            <Route index element={<ProductList />} />
                            <Route path="create" element={<ProductForm />} />
                            <Route path=":id" element={<Product />} />
                            <Route path=":id/edit" element={<ProductForm />} />
                        </Route>
                        <Route path="salvage">
                            <Route index element={<SalvageList />} />
                        </Route>
                        <Route path="custom">
                            <Route index element={<CustomList />} />
                        </Route>
                        <Route path="tags">
                            <Route index element={<TagList />} />
                        </Route>
                    </Route>
                </Routes>
            </HashRouter>
        </Themer>
    );
}

createRoot(document.getElementById("root")).render(<App />);
