import { hydrate, prerender as ssr } from 'preact-iso';
import './index.css'
import { App } from './App.jsx'
import "flag-icons/css/flag-icons.min.css";

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
    return await ssr(<App {...data} />)
}
