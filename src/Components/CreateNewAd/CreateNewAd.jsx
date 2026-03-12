import { useState } from 'react'
import styles from './CreateNewAd.module.css'
import { Icon } from '../../SVG/Icon'
import { type } from '@testing-library/user-event/dist/type'
export const CreateNewAd = ({ setcreateNewOpen, products, setProducts }) => {
    const [file, setFile] = useState("https://static.thenounproject.com/png/selection-icon-4818782-512.png")
    function chooseImage(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(reader.result);
        };
        reader.readAsDataURL(file);
    }
    async function onSub(e) {
        e.preventDefault()
        const newPost = {
            id: new Date().getTime().toString(),
            userId: localStorage.getItem("ID"),
            title: e.target.title.value.trim(),
            price: e.target.price.value.trim(),
            time: new Date().toISOString(),
            about: e.target.about.value.trim(),
            address: {
                country: "Armenia",
                city: e.target.city.value.trim(),
                street: e.target.street.value.trim()
            },
            phone: e.target.phone.value.trim(),
            type: e.target.type.value.trim(),
            image: file
        }
        const putOnDB = await fetch("http://localhost:3010/marketplace", {
            method: "POST",
            body: JSON.stringify(newPost)
        })
        setProducts([...products, newPost])
        setcreateNewOpen(false)
        e.target.reset()
    }
    return (
        <form className={styles.createNewAd} onSubmit={onSub}>
            <span onClick={() => setcreateNewOpen(false)}><Icon name={"xIcon"} size={"25px"} /></span>
            <div className={styles.chooseImage}>
                <label htmlFor="imag"><img src={file} alt="" /></label>
                <input type="file" name='image' id='imag' className={styles.nonSeen} onChange={chooseImage} required />
            </div>
            <input type="text" placeholder='Title' name='title' required />
            <input type="number" placeholder='price' name='price' required />
            <textarea name="about" id="" placeholder='about' required></textarea>
            <select name="city" id="city" required>
                <option value="Yerevan">Yerevan</option>
                <option value="Gyumri">Gyumri</option>
                <option value="Vanadzor">Vanadzor</option>
                <option value="Abovyan">Abovyan</option>
                <option value="Hrazdan">Hrazdan</option>
                <option value="Vagharshapat">Vagharshapat</option>
                <option value="Kapan">Kapan</option>
                <option value="Armavir">Armavir</option>
                <option value="Artashat">Artashat</option>
                <option value="Masis">Masis</option>
                <option value="Goris">Goris</option>
                <option value="Sevan">Sevan</option>
                <option value="Ijevan">Ijevan</option>
                <option value="Dilijan">Dilijan</option>
                <option value="Spitak">Spitak</option>
                <option value="Vedi">Vedi</option>
                <option value="Yeghvard">Yeghvard</option>
                <option value="Martuni">Martuni</option>
                <option value="Vardenis">Vardenis</option>
            </select>
            <select name="type" id="" required>
                <option value="vehicles">Vehicles</option>
                <option value="clothes">Clothes</option>
                <option value="children">Children</option>
                <option value="toy">Toy</option>
                <option value="realEstatey">Real Estatey</option>
                <option value="sport">Sport</option>
                <option value="animals">Animals</option>
                <option value="electronic">Electronic</option>
            </select>
            <input type="text" placeholder='Street' name='street' required />
            <input type="tel" placeholder='phon number' name='phone' required />
            <button>Public</button>
        </form>
    )
}