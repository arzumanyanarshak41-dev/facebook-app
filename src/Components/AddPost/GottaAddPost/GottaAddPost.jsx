import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../../SVG/Icon'
import styles from './GottaAddPost.module.css'
import { logedUserSelect, uploadPost } from '../../../Store/Slices/LogedUserSlice/LogedUserSlice'
import colorSelectPNG from '../../../Asets/colorSelectIcon.jpg'
import closeColorsIcon from '../../../Asets/closeColorsPNG.png'
import galeryIcon from '../../../Asets/galeryAddOpeningIcon.jpg'
import { useState } from 'react'
import { addPost } from '../../../Store/Slices/UserSlice/UserSlice'
import axios from 'axios'
export const GottaAddPost = ({ setOpenPosting }) => {
    const logedUser = useSelector(logedUserSelect)
    const [colorsOpen, setColorsOpen] = useState(true)
    const [selectedColor, setSelectedColor] = useState("blue")
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch()
    const colors = ["red", "gray", "aqua", "blue", "green", "greenyellow", "blueviolet", "white"]
    function selectImage(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    }
    async function onSub(e) {
        e.preventDefault()
        if (selectedImage) {
            const newPost = {
                id: new Date().getTime().toString(),
                url: selectedImage,
                description: e.target.discription.value.trim(),
                uploaded_at: new Date().toISOString(),
                likes: [],
                comments: []
            }
            const result = await axios.patch(`http://localhost:3010/users/${logedUser.id}`, { photos: [...(logedUser.photos || []), newPost] })
            dispatch(addPost({ userId: logedUser.id, post: newPost }))
            dispatch(uploadPost(newPost))
        } else {
            const newPost = {
                id: new Date().getTime().toString(),
                url: {
                    text: e.target.text.value.trim(),
                    background: selectedColor
                },
                discription: "",
                uploaded_at: new Date().toISOString(),
                likes: [],
                comments: []
            }
            const result = await axios.patch(`http://localhost:3010/users/${logedUser.id}`, { photos: [...(logedUser.photos || []), newPost] })
            dispatch(addPost({ userId: logedUser.id, post: newPost }))
            dispatch(uploadPost(newPost))
        }
        setOpenPosting(false)
        e.target.reset()
    }
    return (
        <form className={styles.gottaAddPost} onSubmit={onSub}
            style={
                window.location.href === "http://localhost:3000/home/userpage"
                    ? { top: "-250px", left: "20%" }
                    : {}
            }
        >
            <div className={styles.top}>
                <h3>Create Post</h3>
                <span onClick={() => setOpenPosting(false)}><Icon name={"xIcon"} size={"30px"} /></span>
            </div>
            <div className={styles.creatingBox}>
                <div className={styles.userInfo}>
                    <img src={logedUser.profile_image} alt="" />
                    <h4>{logedUser.fname} {logedUser.lname}</h4>
                </div>
                {
                    selectedImage ?
                        <div className={styles.photoPost}>
                            <input type="text" placeholder='Dicription...' name='discription' />
                            <img src={selectedImage} alt="" className={styles.selectedImage} />
                        </div> :
                        <textarea
                            name="text"
                            placeholder="What's on your mind?"
                            style={{
                                backgroundColor: selectedColor,
                                color: selectedColor === "white" || selectedColor === "greenyellow" ? "black" : "white"
                            }}
                        ></textarea>
                }
                {
                    colorsOpen
                        ? <div className={styles.colorOrImage}>
                            <img src={colorSelectPNG} alt="" onClick={() => setColorsOpen(false)} />
                            <label htmlFor="postedImage"><img src={galeryIcon} alt="" /></label>
                            <input type="file" id='postedImage' onChange={selectImage} />
                        </div>
                        : <div className={styles.colorsShow}>
                            <img src={closeColorsIcon} alt="" onClick={() => setColorsOpen(true)} />
                            {colors.map((el, i) => (
                                <div
                                    key={i}
                                    className={styles.colorChoosen}
                                    style={{ backgroundColor: el }}
                                    onClick={() => setSelectedColor(el)}
                                ></div>
                            ))}
                        </div>
                }
                <button>Post</button>
            </div>
        </form >
    )
}