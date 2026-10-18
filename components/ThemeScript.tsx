export function ThemeScript() {
  const code = `try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.dataset.theme="dark";}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
