module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "strict": 0,
        "no-console": 0,
        "global-require": 0,
        "jsx-a11y/href-no-hash": 0,
        "react/forbid-prop-types": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        'import/no-dynamic-require': 0,
        "import/no-extraneous-dependencies": 0,
        'max-len': ["error", 240],
        "linebreak-style":0,
        "no-eval": 2,
        'indent':0,
        'no-tabs':0,
        "comma-dangle":0,
        'no-array-index-key':0,
        'arrow-parens':0,
        'no-trailing-spaces':1,
        'object-shorthand':0,
        'react/jsx-filename-extension':0,
        'react/jsx-indent':0,
        'react/jsx-indent-props':0,
        'react/require-default-props':0,
        'react/no-array-index-key':0,
        'no-prototype-builtins':0,
        'no-continue':0
    },
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {
        "DEBUG": true,
        "NORMAL_SERVER": true,
        "CUSTOMER_FLAG": true,
        "IS_USE_NATIVE_CAMERA": true,
        "TOMCAT_SERVER_SIGN_ADDRESS": true,
        "TOMCAT_SERVER_ACCOUNT_HINT_ADDRESS": true,
        "UPLOAD_IMG_OVER_TIME": true,
        "IS_NEED_CREATE_HISTORY": true,
    }
};
