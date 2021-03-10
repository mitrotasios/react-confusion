import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators'
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }     
}

// dispatch is dispatch function from store
const mapDispatchToProps = (dispatch) => ({
    // addComment returns action object (for adding a comment)
    // dispatch obtains that as a parameter, which can be used as a component
    // for addComment to become available, add this function to connect
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (feedback) => {dispatch(postFeedback(feedback))},

});

class Main extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }

  render() {
    
    const HomePage = () => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                //leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersErrMess={this.props.leaders.errMess}
                leadersLoading={this.props.leaders.isLoading} />
        );
    }

    const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
                />
        )
    }

    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedBack={this.props.postFeedBack}/>}/>            
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>        
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
