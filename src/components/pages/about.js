import React from "react";
import aboutImage from "../../../static/assets/images/bio/insta2.jpg";

export default function () {
    return(
        <div className="content-page-wrapper">

            <div
                className="left-column"
                style={{
                   background: "url(" + aboutImage + ") no-repeat",
                   backgroundSize: "cover",
                   backgroundPosition: "center"
                }}
            />

            <div className="right-column">
                El objetivo de este CV online es proporcionarte una herramienta interactiva que te permita conocer más sobre mi perfil profesional de manera dinámica. Aquí podrás:
                Explorar mi experiencia laboral: Descubre las posiciones que he ocupado, mis responsabilidades y los resultados alcanzados en cada una de ellas.
                Conocer mis habilidades y competencias: Obtén una visión detallada de las habilidades técnicas y blandas que he desarrollado a lo largo de mi carrera.
                Revisar mis proyectos y logros: Accede a una selección de proyectos en los que he trabajado, incluyendo descripciones, tecnologías utilizadas y el impacto de cada proyecto.
                Ver mi formación académica: Conoce más sobre mi trayectoria educativa y las certificaciones que he obtenido.
                Este CV online está pensado para ser una ventana a mi carrera, ofreciendo la información que necesitas para evaluar cómo puedo contribuir a tu equipo o proyecto. ¡Gracias por visitar y explorar!
            </div>
                
            
        </div>
    );
}