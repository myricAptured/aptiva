// Quiz functionality
let currentQuestion = 1;
const totalQuestions = 15;
const answers = {};

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all Likert buttons
    const likertButtons = document.querySelectorAll('.likert-btn');
    likertButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectAnswer(this);
        });
    });

    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', previousQuestion);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    updateNavButtons();
});

function selectAnswer(button) {
    // Get parent question slide
    const questionSlide = button.closest('.question-slide');
    const questionNum = parseInt(questionSlide.dataset.question);
    const value = parseInt(button.dataset.value);

    // Remove selected class from all buttons in this question
    const allButtons = questionSlide.querySelectorAll('.likert-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add selected class to clicked button
    button.classList.add('selected');

    // Store answer
    answers[questionNum] = value;

    // Enable next button
    document.getElementById('next-btn').disabled = false;

    // Auto-advance after short delay (optional)
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            nextQuestion();
        } else {
            showSubmitButton();
        }
    }, 300);
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        // Hide current question
        document.querySelector(`.question-slide[data-question="${currentQuestion}"]`).classList.remove('active');
        
        currentQuestion++;
        
        // Show next question
        document.querySelector(`.question-slide[data-question="${currentQuestion}"]`).classList.add('active');
        
        updateProgress();
        updateNavButtons();

        // Check if answer already selected
        if (answers[currentQuestion]) {
            document.getElementById('next-btn').disabled = false;
        } else {
            document.getElementById('next-btn').disabled = true;
        }
    }

    if (currentQuestion === totalQuestions) {
        showSubmitButton();
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        // Hide current question
        document.querySelector(`.question-slide[data-question="${currentQuestion}"]`).classList.remove('active');
        
        currentQuestion--;
        
        // Show previous question
        document.querySelector(`.question-slide[data-question="${currentQuestion}"]`).classList.add('active');
        
        updateProgress();
        updateNavButtons();

        // Enable next button if answer exists
        if (answers[currentQuestion]) {
            document.getElementById('next-btn').disabled = false;
        }

        // Hide submit button
        document.getElementById('submit-btn').classList.add('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const currentQuestionSpan = document.getElementById('current-question');
    
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progress + '%';
    currentQuestionSpan.textContent = currentQuestion;
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Enable/disable previous button
    if (currentQuestion === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    // Check if current question has an answer
    if (answers[currentQuestion]) {
        nextBtn.disabled = false;
    }
}

function showSubmitButton() {
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (Object.keys(answers).length === totalQuestions) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    }
}

// Restore selected answers when navigating back
document.addEventListener('DOMContentLoaded', function() {
    // Restore selections if navigating back through questions
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const slide = mutation.target;
                if (slide.classList.contains('active')) {
                    const questionNum = parseInt(slide.dataset.question);
                    if (answers[questionNum]) {
                        const selectedButton = slide.querySelector(`[data-value="${answers[questionNum]}"]`);
                        if (selectedButton) {
                            const allButtons = slide.querySelectorAll('.likert-btn');
                            allButtons.forEach(btn => btn.classList.remove('selected'));
                            selectedButton.classList.add('selected');
                        }
                    }
                }
            }
        });
    });

    const slides = document.querySelectorAll('.question-slide');
    slides.forEach(slide => {
        observer.observe(slide, { attributes: true });
    });
});
