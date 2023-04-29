import React, { useEffect, useState } from 'react'
import Upload from '../../images/thumbnails/picture.svg'
import { getProductById, updateProduct } from '../../../Action/ProductAction'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

function Viewproduct() {
    //dispatch;
    const dispatch = useDispatch();

    //navigation;
    const Navigation = useNavigate()

    //get product id;
    const productId = useParams()
    const productid = productId.id

    //product data;
    const location = useLocation();
    const { productData } = location.state;

    //Alert function;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    //Manual switching general and variant state
    const [isGeneral, setIsGeneral] = useState(true);
    const [isVariation, setIsVariation] = useState(false);

    //Get that particular product;
    useEffect(() => {
        dispatch(getProductById(productid));
    }, [dispatch, productid]);


    //initial value set after use that value to edit method;
    useEffect(() => {
        formik.setValues({
            productName: productData.productName,
            category: productData.category,
            status: productData.status,
            description: productData.description,
            variation: productData.variation,
        });
    }, [])


    //Create new product using formik;
    const formik = useFormik({
        initialValues: {
            productName: "",
            category: "",
            status: "",
            description: "",
            variation: [{ variant: "", price: "", stock: "" }],
        },
        validate: (value) => {
            var errors = {}
            var errors = {}
            if (value.productName === "") {
                errors.productName = "please enter the product name"
            }
            if (value.category === "") {
                errors.category = "please enter the product description"
            }
            if (value.status === "") {
                errors.status = "please enter the product description"
            }
            if (value.description === "") {
                errors.description = "please enter the product description"
            }
            if (value.variant === "") {
                errors.variant = "please enter the product description"
            }
            if (value.price === "") {
                errors.price = "please enter the product description"
            }
            if (value.stock === "") {
                errors.stock = "please enter the product description"
            }
            return errors
        },
        onSubmit: (total) => {
            let update = {
                product: total,
                id: productid
            }
            dispatch(updateProduct(update));
            Toast.fire({ icon: 'success', title: `Product successfully updated` })
            setTimeout(() => {
                Navigation("/portal")
            }, 1000)
        }
    })


    //Manual switching general and variant function
    const handleGeneral = () => {
        setIsGeneral(!isGeneral);
        setIsVariation(!isVariation);
    }

    const handleVariation = () => {
        setIsVariation(!isVariation);
        setIsGeneral(!isGeneral);
    }

    //Add and remove Variant component function;
    const handleAddField = () => {
        const newVariant = { variant: "", price: "", stock: "" };
        formik.setFieldValue("variation", [...formik.values.variation, newVariant]);
    };

    const handleRemoveField = (index) => {
        const newVariants = [...formik.values.variation];
        newVariants.splice(index, 1);
        formik.setFieldValue("variation", newVariants);
    };

    //Add and remove Variant component;
    const renderFields = () => {
        return formik.values.variation.map((variant, index) => {
            const variantId = `variation[${index}]`;
            const key = `variant-${variant.id}`;
            return (
                <div className="isMinus" key={key}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor={`${variantId}.variant`}>
                                    <span className="text-danger">*</span> Variant
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`${variantId}.variant`}
                                    value={variant.variant}
                                    onChange={formik.handleChange}
                                    name={`${variantId}.variant`}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor={`${variantId}.price`}>
                                    <span className="text-danger">*</span> Price
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`${variantId}.price`}
                                    value={variant.price}
                                    onChange={formik.handleChange}
                                    name={`${variantId}.price`}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor={`${variantId}.stock`}>
                                    <span className="text-danger">*</span> Stock keeping unit
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`${variantId}.stock`}
                                    value={variant.stock}
                                    onChange={formik.handleChange}
                                    name={`${variantId}.stock`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group uploader-wrapper">
                        <label htmlFor={`fileInput${variantId}`}>
                            <span className="text-danger">*</span> Upload Image
                        </label>
                        <div className="uploader-wrapper-inner">
                            <img src={Upload} alt="pictures" />
                            <input type="file" id={`fileInput${variantId}`} />
                            Click or drag file to upload
                        </div>
                    </div>
                    <span className="removeSpan" onClick={() => handleRemoveField(index)}>
                        -
                    </span>
                </div>
            );
        });
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="card nav_pills_card nav_pills_card_new">
                    <div className="card-body">
                        <div className="heading_wrapper heading_right_content">
                            <h1 className="head_title">Add Product</h1>
                            <div className="btn_wrapper"><Link to={'/portal'} type="button" className="theme-btn btn-outline-secondary">Discard</Link><button type="submit" className="theme-btn theme-btn-primary">Save</button></div>
                        </div>
                        <ul className="nav nav-pills mb-0 nav_pills_wrapper" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation"><button className={isGeneral ? 'nav-link active' : 'nav-link'} id="pills-general-tab" data-toggle="pill" data-target="#pills-general" type="button" role="tab" aria-controls="pills-general" aria-selected="true" onClick={() => { handleVariation() }}>General</button></li>
                            <li className="nav-item" role="presentation"><button className={isVariation ? 'nav-link active' : 'nav-link'} id="pills-variation-tab" data-toggle="pill" data-target="#pills-variation" type="button" role="tab" aria-controls="pills-variation" aria-selected="false" onClick={() => { handleGeneral() }}>Variation</button></li>
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="pills-tabContent">
                    <div className={isGeneral ? 'stab-pane fade show active' : 'tab-pane fade show'} id="pills-general" role="tabpanel" aria-labelledby="pills-general-tab">
                        <div className="card nav_pills_card">
                            <div className="card-body">
                                <div>
                                    <div className="form-title">Basic Info</div>
                                    <div className="form-group"><label htmlFor="productName"><span className="text-danger">*</span> Product Name</label><input type="name" name="productName" className={`${formik.errors.productName && formik.errors.productName ? "form-control border-danger" : "form-control"}`} id="productName" value={formik.values.productName} onChange={formik.handleChange} /></div>
                                    {formik.errors.productName && formik.errors.productName ? <p style={{ color: 'red', marginBottom: "1rem" }}>{formik.errors.productName}</p> : null}
                                    <div className="form-group"><label htmlFor="Description"><span className="text-danger">*</span> Description</label><textarea type="text" id="Description" className={`${formik.errors.description && formik.errors.description ? "form-control border-danger" : "form-control"}`} name="description" rows={3} value={formik.values.description} onChange={formik.handleChange} /></div>
                                    {formik.errors.description && formik.errors.description ? <p style={{ color: 'red' }}>{formik.errors.description}</p> : null}
                                </div>
                            </div>
                        </div>
                        <div className="card nav_pills_card">
                            <div className="card-body">
                                <div>
                                    <div className="form-title">Organization</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="productName"><span className="text-danger">*</span> Category</label>
                                                <select value={formik.values.category} onChange={formik.handleChange} className={`${formik.errors.category && formik.errors.category ? "form-control border-danger" : "form-control"}`} id="productName" name='category'>
                                                    <option >Select</option>
                                                    <option value="Clothe">Clothe</option>
                                                    <option value="Bags">Bags</option>
                                                    <option value="Shoes">Shoes</option>
                                                    <option value="Watches">Watches</option>
                                                    <option value="Devices">Devices</option>
                                                </select>
                                            </div>
                                            {formik.errors.category && formik.errors.category ? <p style={{ color: 'red', marginBottom: "1rem" }}>{formik.errors.category}</p> : null}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Description"><span className="text-danger">*</span> Status</label>
                                                <select value={formik.values.status} onChange={formik.handleChange} name='status' className={`${formik.errors.status && formik.errors.status ? "form-control border-danger" : "form-control"}`} id="productName">
                                                    <option >Select</option>
                                                    <option value="In stock">In stock</option>
                                                    <option value="Limited stock">Limited stock</option>
                                                    <option value="Out of stock">Out of stock</option>
                                                </select>
                                            </div>
                                            {formik.errors.status && formik.errors.status ? <p style={{ color: 'red', marginBottom: "1rem" }}>{formik.errors.status}</p> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={isVariation ? `tab-pane fade show active` : `tab-pane fade show`} id="pills-variation" role="tabpanel" aria-labelledby="pills-variation-tab">
                        <div className="card nav_pills_card">
                            <div className="card-body">
                                <div>
                                    <div className="form-title">Variants</div>
                                    <p>Add A Custome Variat Options For Your Product, Like Different Sizes Or Colors.</p>
                                    {/* Add and remove Variant component area; */}
                                    {renderFields()}
                                    {/* Add and remove Variant component area; */}
                                    <button className="uploader-add-btne" type="button" onClick={() => { handleAddField() }}>Add field</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Viewproduct