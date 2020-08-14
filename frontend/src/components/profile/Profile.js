import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import TheContext from '../../TheContext'
import actions from '../../api'
import moment from 'moment'
import { NotificationManager } from 'react-notifications';



const Profile = (props) => {
    const [posts, setPosts] = useState([])
    const [otherPosts, setOtherPosts] = useState([])
    
    useEffect(() => {

        //Get my posts 
        actions.getMyPosts().then(posts => {
            if (posts)
                setPosts(posts.data.reverse())
        }).catch(err => console.error(err))

        //Get other posts
        actions.getOtherPosts().then(posts => {
            if (posts)
                setOtherPosts(posts.data.reverse())
        }).catch(err => console.error(err))

    }, [])
    


    return (
        <div>

            <Welcome />  {/*'Look ma!  No props!!!'*/}
            <AddPost {...props} posts={posts} />
            <MyPosts posts={posts} setPosts={setPosts} />
            <OthersPosts posts={otherPosts} setOtherPosts={setOtherPosts}/>

        </div>
    );
}

function MyPosts({ posts, setPosts }) {

    let rows = posts.map((post, i) => <EachMyPost key={post._id} post={post} posts={posts} setPosts={setPosts} i={i} />)

    rows.unshift(
        React.createElement('h2', { key: 'help you' }, 'I need help with:')
    )
    return rows
}


function EachMyPost({ post, posts, setPosts, i }) {

    let [resolve, setResolve] = useState(post.resolved)
    let [timeUp, setTimeup] = useState(false)
    let [time, setTime] = useState(0)
    let { user, setUser } = useContext(TheContext)

    const resolvePost = (val) => (event) => {

        setResolve(val)
        console.log(val)
        if(val) {
            console.log('resolve')
            let t = setTimeout(() => {
                console.log('timouet fired')
                actions.resolvePost({ post, resolved: val }).then(res => {
                    let newPosts = [...posts]
                    newPosts[i] = res.data.posted
                    setPosts(newPosts)
                    setUser(res.data.helpee)
                    if (val)
                        NotificationManager.success(`You give ${post.bounty} points`, 'Issue Resolved')
                    else
                        NotificationManager.warning(`You are refunded ${post.bounty} points`, 'Issue Still Open')
                }).catch(err => console.error(err))

                setTimeup(true)
            }, 5000)
            setTime(t)
        } else {
            clearTimeout(time)
        }

    }



    const cancelPost = (event) => {
        console.log(i, posts, time)
        actions.cancelPost({ post }).then(res => {
            console.log(res, res.data.user, 'hmmm')
            let newPosts = [...posts]
            newPosts.splice(i, 1)
            setPosts(newPosts)
            setUser(res.data.user)
            NotificationManager.success(`You are refunded ${post.bounty} points`, 'Issue Deleted')

        }).catch(err => console.error(err))

    }


    return (
        <li key={post._id}>
            <div>{post.message}  <i>{post.bounty} Points</i> <i><img src={post.helper?.imageUrl} /> {post.helper?.name}</i> </div>
            {post.helper ?
                resolve ?
                    <button disabled={timeUp} onClick={resolvePost(false)}>Undo<h2>🔴</h2></button>
                    :
                    <button onClick={resolvePost(true)}>Resolve<h2>✅</h2></button>
                : <button onClick={cancelPost}>Cancel</button>}
        </li>
    )
}


function OthersPosts({ posts, setOtherPosts }) {

    let rows = posts.map((post, j) => <OPost post={post} posts={posts} setOtherPosts={setOtherPosts} j={j}/>)
    rows.unshift(
        React.createElement('h2', { key: 'help me' }, 'Im helping:')
    )
    return rows
}


function OPost({post, posts, setOtherPosts, j}){
    
    //Same function exists in Home.  This could be cleaned up.
    const help = (val) => (event) => {
        console.log('help', post, val)

        actions.helpUser({post, help:val}).then(res => {
            let newPosts = [...posts]
            newPosts.splice(j,1)
            setOtherPosts(newPosts)
        }).catch(err => console.error(err))
    }
    return (
        <li key={post._id}>
            <div>{post.message}
                <i>{post.bounty}</i>
                <i><img src={post.user?.imageUrl} /></i>
                <i>Created {moment(post.createdAt).format('h:mm:ss a')}</i>
                <i>Last updated {moment(post.updatedAt).format('h:mm:ss a')}</i>
            </div>

            <div>You're helping {post.user?.name}</div>


            <button onClick={help(false)}> <h2> NVM 🛑</h2></button>
        </li>
    )
}




const AddPost = ({ history, posts }) => {
    const [message, setMessage] = useState("")

    let { user, setUser } = React.useContext(TheContext);

    //See if there is enough points to ask a question
    //let totalPointsSpent = posts.reduce((acc,post) => {
    //     console.log(post.resolved)
    //     if(!post.resolved && !post)
    //         return acc += post.bounty
    //     else 
    //         return acc
    // }, 0)
    //console.log(totalPointsSpent)
    //let outOfPoints = user?.points - totalPointsSpent <= 0

    let outOfPoints = user?.points <= 0


    const handleSubmit = e => {
        e.preventDefault();
        
        if(user?.calendly === "https://calendly.com/ Click here to set your calendly!")
            return alert('Please set your calendly before posting...')
        
        actions.addPost({ message }).then(res => {
            console.log(res)
            setUser(res.data.user)
            NotificationManager.info(`You've submitted a new issue`)
            history.push('/')
        }).catch(err => console.error(err))

    }


    return (
        <Fragment>

            <form id="askForHelp" onSubmit={handleSubmit}>
                <input disabled={outOfPoints} onChange={(e) => setMessage(e.target.value)} placeholder={outOfPoints ? "Sorry your out of points" : "What's your issue?"} type="text" />
                <button disabled={outOfPoints}>Add</button>

            </form>
        </Fragment>

    )
}



const Welcome = () => {

    let { user, history, setUser} = useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
    
    let [calendly, setCalendly] = useState(user?.calendly)
    let [edit, setEdit] = useState(true)

    const submitCalendly = (e) => {
        e.preventDefault()
        actions.updateCalendly({calendly}).then(res => {
            console.log(res)
            NotificationManager.success(`You've updated your calendly`)
            setEdit(true)
            setUser(res.data.user)
        }).catch(err => console.error(err))
    } 
    

    if (!user) {
        return <Redirect to='/' />;
    }
    //onClick={() => history.push('/')}
    return (
        <Fragment>
        <div className="profile">
            <img src={user?.imageUrl} />
            <div >
                Welcome {user?.name}
            </div>
            <div>{user?.points} Points</div>

        </div>
        <form id="cal" onClick={()=>{ setEdit(false);}} onSubmit={submitCalendly}>
            <input disabled={edit} value={calendly} type="text" onChange={(e) => setCalendly(e.target.value)} />    
            <button hidden={edit} >Save</button>
        </form>
        </Fragment>
    )
}



function notifyMe(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}


export default Profile;