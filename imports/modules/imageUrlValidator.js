export const imageUrlValidator = (url, callback) => {
        	$("<img>", {
        	    src: url,
        	    load() { callback(true); },
        	    error() { callback(false); }
        	});
    	}
