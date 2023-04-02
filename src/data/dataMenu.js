
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faEarthAsia,
    faQuestion,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';



export const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'Tiếng Việt',
                    code: 'vi',
                },
                {
                    title: 'English',
                    code: 'en',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQuestion} />,
        title: 'Phản hòi và trợ giúp',
        path: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt trên bàn phím',
    },
];

