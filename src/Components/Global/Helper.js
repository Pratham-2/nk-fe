import { storage } from './../../firebaseConfig/firebaseConfig'
import Swal from 'sweetalert2';

export const StartProcessing = (btn) => {
    // Activate indicator
    btn.setAttribute("data-kt-indicator", "on");
    btn.setAttribute("disabled", "true");
    const spanElement = document.createElement('span');
    spanElement.className = 'indicator-progress';
    spanElement.innerHTML = `<span class="spinner-border spinner-border-sm align-middle ms-2"></span>`;

    btn.appendChild(spanElement)
}
  
export const StopProcessing = (btn) => {
    btn.removeAttribute('data-kt-indicator');
    btn.removeAttribute('disabled');
    btn.removeChild(btn.children[0])
}

export const getFileExt = (fileName) => {
    const mtype = fileName.split('.');
    const ext = mtype[mtype.length - 1];
    return ext.toLowerCase();
}

export const getString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export function FileUploadHelper(bucketName, fileName, data) {
    const storageRef = storage.ref();
    let uploadTask = storageRef.child(`${bucketName}/${fileName}`).put(data);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            function () { },
            function (error) {
                // console.log('imageError', error);
                reject(error);
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    // console.log('File available at', downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
}

export const GetImage = async (path) => {
    try {
        const storageRef = storage.ref();
        let starsRef = storageRef.child(path);
        return  await starsRef.getDownloadURL()
    } catch (error) {
        return "ImageNotFound"
    }
}

export const DeleteImage = (path) => {
    const storageRef = storage.ref()
    var desertRef = storageRef.child(path);

    // Delete the file
    desertRef.delete().then(() => {
        // File deleted successfully
        return 'success'
    }).catch((error) => {
        // Uh-oh, an error occurred!
        return (error)
    });
}


// export const GetImage = async (path) => {
//     console.log('first', path)
//     const storageRef = storage.ref();
//     let starsRef = storageRef.child(path);
//     return new Promise((resolve, reject) => {
//         starsRef.getDownloadURL().then((error, data) => {
//             console.log(data)
//             if (error)
//                 reject(error);
//             else
//                 resolve(data)
//         })
//     })
// } 

export const displayError = (type, err) => {
    Swal.fire({
        icon: type,
        titleText: err.message,
    });
}

export const scrolltoTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

export const scrollToSearch = () => {
    const element = document.getElementById('searchBar')
    if (!element) window.location.replace('/')
    if (element) element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
}