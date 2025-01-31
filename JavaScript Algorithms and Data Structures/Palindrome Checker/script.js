document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        textInput: document.getElementById('text-input'),
        checkButton: document.getElementById('check-btn'),
        result: document.getElementById('result')
    };

    const isPalindrome = (str) => {
        const cleanStr = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
        let left = 0;
        let right = cleanStr.length - 1;
        
        while (left < right) {
            if (cleanStr[left] !== cleanStr[right]) return false;
            left++;
            right--;
        }
        return true;
    };

    const updateResult = (() => {
        let lastText = '';
        let lastResult = false;
        
        return (text, isPal) => {
            if (text === lastText && isPal === lastResult) return;
            
            elements.result.textContent = `${text} is ${isPal ? 'a' : 'not a'} palindrome`;
            elements.result.className = `result ${isPal ? 'palindrome' : 'not-palindrome'}`;
            
            lastText = text;
            lastResult = isPal;
        };
    })();

    const computePalindrome = () => {
        const text = elements.textInput.value.trim();
        
        if (!text) {
            alert('Please input a value');
            return;
        }

        updateResult(text, isPalindrome(text));
    };

    const handleInput = (e) => {
        if (e.type === 'click' || (e.type === 'keypress' && e.key === 'Enter')) {
            computePalindrome();
        }
    };

    elements.checkButton.addEventListener('click', handleInput);
    elements.textInput.addEventListener('keypress', handleInput);
});