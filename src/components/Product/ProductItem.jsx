import { useNavigate, useParams } from "react-router-dom";
import {homes} from '../../datas/List';
import Collapse from "../About/Collapse";
import "../../styles/productitem.scss";
import PicturesSlide from "./PicturesSlide"
import Rating from "./ProductRating"
import { useEffect } from "react";



function ProductItem() {
    // récupérer l'id du logement dans l'url //
    const { id } = useParams()
    // récupérer l'appartement dans la liste homes selon son id //
    const flatInfos = homes.filter(data => data.id === (id))
    // récupérer tous les id de la liste homes pour les comparer //
    const idList = homes.map(data => data.id)
    const navigate = useNavigate()

    useEffect(() => {
        // en cas de changement de l'id du produit dans l'URL affiche la page du produit ou redirige vers la page d'erreur //
        const idSearch = idList.find((nb) => nb === id)
        if (idSearch === undefined){
            // renvoie vers 404 //
            navigate('*')
        }
    })
    
    return (
        <div>
        {flatInfos.map(({ id, title, rating, description, equipments, pictures, location, tags, host }) => (
            <div key={id} className="kaza__product">
                <PicturesSlide pictures = {pictures}/>
                <div className='kaza__infosflex'>
                <div>
                    <div className='kaza__product__title'>{title}</div>
                    <div className="kaza__product__location">{location}</div>
                    <div className="kaza__product__tags">{tags.map((tag, index) => <span key={index}>{(tag)}</span>)}</div>
                </div>
                <div className='kaza__product__hostandrating'>
                    <div className="kaza__product__host">
                        <div className="kaza__product__host__name">
                            <span>{(host.name.split(' '))[0]}</span>
                            <span>{(host.name.split(' '))[1]}</span>
                        </div>
                        <img src={host.picture} alt="visage du propriétaire" />
                    </div>
                <Rating rating = {rating} />
                </div>
                </div>
                
                <div className="kaza__product__collapse">
                    <div className="kaza__product__collapse__width"><Collapse  title={"description"} text={description}/></div>
                    <div className="kaza__product__collapse__width"><Collapse  title={"équipements"} textArray={equipments}/></div>
                </div>
            </div>
        ))
        }</div>
    )
}
 
export default ProductItem

