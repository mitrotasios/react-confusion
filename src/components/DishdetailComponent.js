import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
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

    renderComments(dish) {        
        
        if(dish.comments!=null) {
            const comments = dish.comments.map((comment) => {
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
    
            return comments;
        }
        else {
            return(
                <div></div>
            ) 
        }
        
    }

    render() {
        if (this.props.dish!=null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.dish)}
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
}

export default DishDetail;

//Return a <div> from the render() function. 
//This <div> should use the Bootstrap row class to position the content within the <div>. 
//This div will display both the details of the dish in a Card and the list of comments side-by-side for medium to extra large screens, but will stack them for xs and sm screens.