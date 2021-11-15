import axios from 'react-native-axios';

const downloadSizeInBits = 12000000;

export default class InternetSpeedService {
    static measureConnectionSpeed = async (imageURIParam) => {
        const imageURI = imageURIParam ? imageURIParam : 'https://drive.google.com/open?id=1MBHJXeRxMLLwHFpqbgTdEPsFArMM0cz7';
        const startTime = (new Date()).getTime();

        let result = await axios.get(imageURI).then();

        if (result) {
            const endTime = (new Date()).getTime();
            const duration = (endTime - startTime) / 1000;
            const speed = Number((downloadSizeInBits / (1024 * 1024 * duration))).toFixed(2);

            return speed;
        } else {
            return null;
        }
    }
}

