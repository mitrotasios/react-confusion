import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments}) {        
    
    if(comments!=null) {
        const commentsList = comments.map((comment) => {
        let options = { year: "numeric", month: "short", day: "numeric" };
        return(
            <ul key={comment.id} className="list-unstyled">
                <li className="mb-2">{comment.comment}</li>
                <li>
                    -- {comment.author}{" "}
                    {new Date(comment.date).toLocaleDateString("en-US", options)}
                </li>
            </ul>
        );                    
        });

        return commentsList;
    }
    else {
        return(
            <div></div>
        ) 
    }
    
}

const DishDetail = (props) => {
    console.log('Dishdetail Component render invoked');

    if (props.dish!=null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}/>
                    </div>                
                </div>  
            </div>
        );
    }
    else {
        return(
            <div></div>
        )
    }        
}


export default DishDetail;

//Return a <div> from the render() function. 
//This <div> should use the Bootstrap row class to position the content within the <div>. 
//This div will display both the details of the dish in a Card and the list of comments side-by-side for medium to extra large screens, but will stack them for xs and sm screens.