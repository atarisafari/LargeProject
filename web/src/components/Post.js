
import React, { Component, useState } from 'react';
import {deletePost} from '../utils/apiCalls';
import LikeButton from '@material-ui/icons/FavoriteBorder';
import CommentButton from '@material-ui/icons/Comment';
import styles from '../styles/post_profile_styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from '@material-ui/core/styles';
import GuildSword from '../imgs/0_GuildSword_Icon.png';
import Sword from '../imgs/1_Sword_Icon.png';
import BowArrow from '../imgs/2_BowArrow_Icon.png';
import Staff from '../imgs/3_Staff_Icon.png';
import Shield from '../imgs/4_Shield_Icon.png';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';


const Post = (props) => {
    const token = localStorage.getItem('token');
    const [comment,setComment] = useState('');
    const {classes} = props;
    let user = '';
    if(props.username===''){
        user = localStorage.getItem('username');
    }else{
        user = props.username;
    }

    const commentHandler = comment=>{
        setComment(comment);
        console.log(comment);
    }

    const addComment = async() =>{
        if(comment === ''){ //If passwords don't match then dont make the api call
            alert("Can't add an empty comment");
        }
        // else{
        //     let data = await signUp(username,password,display_name,profile_pic_url);
        //     console.log("Result" , data);
        //     if(data.error === ""){
        //         //TODO
        //         console.log("Sign up was successful");
        //         props.history.push("/");
        //     }
        //     else{
        //         alert(data.error);
        //     }
        // }
        
    }

    const deleteHandler = async() => {
        let result =  await deletePost(token, props.id).then(ble => ble) 
        console.log('Delete post response: ', result);
    }

    const ToggleContent = ({ toggle, content }) => {
        const [isShown, setIsShown] = useState(false);
        const hide = () => setIsShown(false);
        const show = () => setIsShown(true);
        
        return (
        <React.Fragment>
            {toggle(show)}
            {isShown && content(hide)}
        </React.Fragment>
        );
    };
    

    return (
        <div className={classes.post_div} id={props.id} >

            <Card className={classes.post_card} elevation={4} >
                <CardBody className={classes.post_card_body}>
                    <CardTitle className={classes.post_card_title} tag="h1"> {user}<Button close onClick={deleteHandler}/></CardTitle>
                    <CardText className={classes.post_card_text} tag="p">
                        {props.content}
                    </CardText>
                <IconButton color="inherit">
                    <Badge badgeContent={10} color="secondary">
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
            
                <ToggleContent
                    toggle={show => <IconButton onClick={show}><CommentButton/></IconButton>}
                    content={hide => (
                        <div>
                            <div className="media mb-3">
                                <Avatar
                                    className="mr-3 bg-light rounded"
                                    width="48"
                                    height="48"
                                    src= {GuildSword}
                                    alt= '/static/images/avatar/2.jpg'
                                />

                                <div className="media-body p-2 shadow-sm rounded bg-light border">
                                    <small className="float-right text-muted">{props.time_created}</small>
                                    <h6 className="mt-0 mb-1 text-muted">Jorge says:</h6>
                                    Stop that!
                                </div>
                            </div>
                        </div>
                    )}
                />
                    <TextField 
                        id="textPopUp" 
                        fullWidth 
                        multiline
                        placeholder="Make a comment..." 
                        onBlur= { e => commentHandler(e.target.value)}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment className={classes.post_comment_input} position="end">     
                                    <Button className={classes.comment_button} variant="primary" size="small" onClick={()=>addComment()}>
                                        Comment
                                    </Button>
                                </InputAdornment>
                        }}
                    /> 
                </CardBody>
            </Card>
        </div>
    );
};


export default withStyles(styles)(Post);

