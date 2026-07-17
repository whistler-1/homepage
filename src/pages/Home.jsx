export default function Home() {
  return (
    <>
      <h1>Benjamin Borgen Whistler</h1>
      <p className="tagline">
        Backend software developer, M.Sc. student at UiO
      </p>
      {/* Introduction */}
      <p>
        I'm a backend developer starting the final year of my master's degree in
        Programming and System Architecture at the University of Oslo
        (graduating in spring 2027). My focus is on building reliable,
        well-structured server-side systems, mostly in C# and .NET with Azure,
        but I've used quite a bit of Java for various projects lately.
      </p>
      <p>
        This summer I was lucky enough to get a position as a summer student at
        DNV, where I use agentic AI to do "re-engineering". Essentially I
        generate a spec document for an old program, then use that spec document
        to create a fresh program that fullfills all the specifications. This is
        especially useful for old and complex systems built on other deprecated
        or insecure systems.
      </p>

      {/* <aside class="portrait">
      <br />
      <img src="media/portrait.jpg" alt="A portrait image of Benjamin smiling at the camera." />
    </aside> */}

      <p>
        During my bachelor's I built the backend for an internal planning tool
        at Multiconsult: 43 REST API endpoints in .NET/C#, layered architecture,
        Azure SQL. I stayed on that summer to help ship a Revit plugin for BIM
        synchronization, deployed across the company.
      </p>
      <p>
        I'm in the early stages of my master's thesis on the Oslofjord Digital
        Twin project. At the moment I'm focusing on reading broader relevant
        literature.
      </p>

      <p>
        <a className="button" href="https://www.linkedin.com/in/bbwhistler/">
          LinkedIn
        </a>
        <a className="button" href="https://github.com/whistler-1">
          GitHub
        </a>
        <a
          className="button"
          href="/media/Benjamin_Whistler_Resume_1page.pdf"
          download
        >
          Resume
        </a>
      </p>
    </>
  );
}
