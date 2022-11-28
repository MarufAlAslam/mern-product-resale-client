import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Utils/Contexts/AuthProvider';
import './AddProductForm.css'

const AddProductForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [category, setCategory] = useState([]);
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useContext(AuthContext)
    // console.log(imgHostKey);
    // const [todaysDate, setTodaysDate] = useState("");

    const d = new Date().getDate();
    const m = new Date().getMonth() + 1;
    const y = new Date().getFullYear();

    // setTodaysDate(`${d}/${m}/${y}`);


    useEffect(() => {
        // use axios to get categories from database
        axios.get('http://localhost:5000/categories')
            .then(res => {
                setCategory(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const onSubmit = data => {
        // Add product to database
        setIsUploading(true);

        const image = data.img[0];
        // console.log(img);
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const productData = {
                        seller: user.email.split('@')[0],
                        selleremail: user.email,
                        name: data.name,
                        img: imgData.data.url,
                        originalprice: data.originalprice,
                        price: data.price,
                        category: data.category,
                        condition: data.condition,
                        mobile: data.mobile,
                        location: data.location,
                        description: data.description,
                        yearofpurchase: data.yearofpurchase,
                        today: data.today,
                        isAdvertise: data.advertise,
                        status: "available"
                    }

                    fetch('http://localhost:5000/product', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            toast.success("Product added successfully");
                        })
                        .catch((error) => {
                            setError('Error:', error);
                        });

                    reset()
                    setIsUploading(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(data);
    };



    console.log(category);


    return (
        <div className='py-10 lg:w-5/6 w-full mx-auto'>
            {
                isUploading &&
                (
                    <div className='isUploading'>
                        Uploading...
                    </div>
                )
            }
            <h3 className='text-center text-2xl font-bold'>Add Product</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 lg:w-1/2 w-full mx-auto'>

                {/* <div className='input-field my-3'>
                    <input type="text" {...register("seller", { required: true })} name="seller" placeholder="Enter Seller Name || The name you want to display with products" className="input input-bordered input-primary w-full" />

                    {errors.seller && <p className='text-error my-3 text-left'>Seller Name is required</p>}
                </div> */}

                <div className='input-field my-3'>
                    <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter Product Name" className="input input-bordered input-primary w-full" />

                    {errors.name && <p className='text-error my-3 text-left'>Product Name is required</p>}
                </div>

                <div className='input-field my-3'>
                    <label>Upload Product Image</label>
                    <input type="file" {...register("img", { required: true })} name="img" className="input my-3 px-0 h-full w-full" />

                    {errors.img && <p className='text-error my-3 text-left'>Product Image is required</p>}
                </div>

                <div className='input-field my-3'>
                    <input type="number" {...register("originalprice", { required: true })} name="originalprice" placeholder="Enter Original Price" className="input input-bordered input-primary w-full" />

                    {errors.originalprice && <p className='text-error my-3 text-left'>Original Price is required</p>}
                </div>

                <div className='input-field my-3'>
                    <input type="number" {...register("price", { required: true })} name="price" placeholder="Enter Re-Sell Price" className="input input-bordered input-primary w-full" />

                    {errors.price && <p className='text-error my-3 text-left'>Re-Sell Price is required</p>}
                </div>

                <div className='input-field my-3'>
                    <label className='mb-3 block'>
                        Select Product Category
                    </label>
                    <select {...register("category", { required: true })} name="category" className="input input-bordered input-primary w-full">
                        {
                            category.map(cat => <option key={cat._id} value={cat.title}>{cat.title}</option>)
                        }
                    </select>

                    {errors.category && <p className='text-error my-3 text-left'>Product Category is required</p>}
                </div>

                <div className='input-field my-3'>
                    <label className='mb-3 block'>
                        Select Product Condition
                    </label>
                    <select {...register("condition", { required: true })} name="condition" className="input input-bordered input-primary w-full">
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                    </select>

                    {errors.condition && <p className='text-error my-3 text-left'>Product Condition is required</p>}
                </div>

                <div className='input-field my-3'>
                    <input type="text" {...register("mobile", { required: true })} name="mobile" placeholder="Enter Mobile Number" className="input input-bordered input-primary w-full" />

                    {errors.mobile && <p className='text-error my-3 text-left'>Mobile Number is required</p>}
                </div>

                <div className='input-field my-3'>
                    <input type="text" {...register("location", { required: true })} name="location" placeholder="Enter Location" className="input input-bordered input-primary w-full" />

                    {errors.location && <p className='text-error my-3 text-left'>Location is required</p>}
                </div>

                <div className='input-field my-3'>
                    <textarea cols="30" rows="5" placeholder='Enter Description' {...register("description", { required: true })} name="description" className="textarea input-bordered input-primary w-full"></textarea>
                    {/* <textarea rows='5' placeholder="Enter Location"  ></textarea> */}

                    {errors.description && <p className='text-error my-3 text-left'>Description is required</p>}
                </div>

                <div className='input-field my-3'>
                    <input type="text" {...register("yearofpurchase", { required: true })} name="yearofpurchase" placeholder="Enter Year of Purchase" className="input input-bordered input-primary w-full" />

                    {errors.yearofpurchase && <p className='text-error my-3 text-left'>Year of Purchase is required</p>}
                </div>


                <textarea cols="30" defaultValue={`${d}/${m}/${y}`} rows="1" {...register("today")} className="input input-bordered input-primary w-full hidden"></textarea>

                <div className='input-field my-3'>
                    <label className='mb-3 block'>
                        Want to Advertise this item?
                    </label>
                    <select {...register("advertise", { required: true })} name="advertise" className="input input-bordered input-primary w-full">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    {errors.advertise && <p className='text-error my-3 text-left'>Product Advertise is required</p>}
                </div>


                {/* <input type="text" /> */}

                <p className='text-center text-error'>
                    {error}
                </p>

                <div className='text-right mt-5'>
                    <button type="submit" className='btn btn-primary'>
                        Add Product
                    </button>
                </div>
            </form>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddProductForm;