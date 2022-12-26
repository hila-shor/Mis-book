const { Outlet, Link } = ReactRouterDOM

export function AboutUs(){

  return <section className="about-us main-layout">
    <nav>
            <Link to="/about">Index</Link> |
            <Link to="/about/team">Team</Link> |
            <Link to="/about/vision">Vision</Link>
    </nav>

    <div className="nested-route">
        <Outlet />
    </div>

    <div className="about-container">
        <h2>About us</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptates fuga, voluptatum aliquam officia minima nam corrupti illo sint 
        </p>
        <img className="about-img" src="assets/img/team.jpg" />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, ratione vitae, nulla iste odio in nihil natus cupiditate cum ea quod, ullam praesentium harum doloribus vero nemo. Quibusdam voluptates, exercitationem in, corrupti illo inventore a reiciendis facilis repellendus quas quo autem fugiat quasi provident. Mollitia dignissimos minus exercitationem veniam cumque magnam animi magni molestias itaque totam repudiandae, enim, amet suscipit provident reprehenderit quibusdam. Beatae, saepe distinctio hic, voluptatum accusamus deserunt omnis sint sunt, dicta officia aut. Aliquid nam voluptatum modi doloribus temporibus accusamus, perferendis nemo porro iusto veritatis sequi voluptate eligendi quaerat est dolorum odio nulla aperiam tenetur quas assumenda.</p>
      
    </div>


  </section>
}