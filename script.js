class PronunciationTestBot {
    constructor() {
        this.apiKey = localStorage.getItem('googleAIKey') || '';
        this.testState = {
            isActive: false,
            currentSentence: 0,
            totalSentences: 5,
            sentences: [],
            scores: [],
            userResponses: []
        };
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isRecording = false;
        
        this.initializeElements();
        this.initializeSpeechRecognition();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.textInput = document.getElementById('textInput');
        this.micButton = document.getElementById('micButton');
        this.sendButton = document.getElementById('sendButton');
        this.recordingIndicator = document.getElementById('recordingIndicator');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.settingsModal = document.getElementById('settingsModal');
        this.apiKeyInput = document.getElementById('apiKey');
        this.voiceSpeedSlider = document.getElementById('voiceSpeed');
        this.speedValue = document.getElementById('speedValue');
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.isRecording = true;
                this.micButton.classList.add('recording');
                this.recordingIndicator.classList.add('active');
            };
            
            this.recognition.onend = () => {
                this.isRecording = false;
                this.micButton.classList.remove('recording');
                this.recordingIndicator.classList.remove('active');
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.textInput.value = transcript;
                this.handleUserInput(transcript, true);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.addMessage('ai', 'Sorry, I couldn\'t hear you clearly. Please try again or type your response.');
                this.isRecording = false;
                this.micButton.classList.remove('recording');
                this.recordingIndicator.classList.remove('active');
            };
        } else {
            console.warn('Speech recognition not supported');
            this.micButton.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Send button and Enter key
        this.sendButton.addEventListener('click', () => {
            const text = this.textInput.value.trim();
            if (text) {
                this.handleUserInput(text, false);
                this.textInput.value = '';
            }
        });

        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = this.textInput.value.trim();
                if (text) {
                    this.handleUserInput(text, false);
                    this.textInput.value = '';
                }
            }
        });

        // Microphone button
        this.micButton.addEventListener('click', () => {
            if (this.recognition) {
                if (this.isRecording) {
                    this.recognition.stop();
                } else {
                    this.recognition.start();
                }
            }
        });

        // Settings modal
        document.getElementById('settingsButton').addEventListener('click', () => {
            this.settingsModal.classList.add('active');
            this.apiKeyInput.value = this.apiKey;
        });

        document.getElementById('closeSettings').addEventListener('click', () => {
            this.settingsModal.classList.remove('active');
        });

        document.getElementById('saveSettings').addEventListener('click', () => {
            this.apiKey = this.apiKeyInput.value.trim();
            localStorage.setItem('googleAIKey', this.apiKey);
            this.settingsModal.classList.remove('active');
            this.addMessage('ai', 'Settings saved successfully!');
        });

        // Voice speed slider
        this.voiceSpeedSlider.addEventListener('input', (e) => {
            this.speedValue.textContent = e.target.value + 'x';
        });

        // Reset button
        document.getElementById('resetButton').addEventListener('click', () => {
            this.resetTest();
        });

        // Close modal when clicking outside
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.settingsModal.classList.remove('active');
            }
        });
    }

    showWelcomeMessage() {
        const welcomeMessage = "Hi, I'm your Pronunciation Test Agent - Spoken. Are you ready to start the test? Type 'yes' to begin!";
        this.addMessage('ai', welcomeMessage);
        this.speakText(welcomeMessage);
    }

    async handleUserInput(text, isVoice) {
        this.addMessage('user', text);

        if (!this.testState.isActive) {
            if (text.toLowerCase().includes('yes')) {
                await this.startTest();
            } else {
                const response = "Please type 'yes' when you're ready to start the pronunciation test!";
                this.addMessage('ai', response);
                this.speakText(response);
            }
        } else {
            await this.processPronunciationAttempt(text, isVoice);
        }
    }

    async startTest() {
        this.testState.isActive = true;
        this.testState.currentSentence = 0;
        this.testState.sentences = [];
        this.testState.scores = [];
        this.testState.userResponses = [];
        
        this.progressContainer.classList.add('active');
        this.updateProgress();

        const startMessage = "Great! Let's begin your pronunciation test. I'll give you 5 sentences to read aloud. Here's your first sentence:";
        this.addMessage('ai', startMessage);
        this.speakText(startMessage);

        await this.generateNextSentence();
    }

    async generateNextSentence() {
        if (!this.apiKey) {
            this.addMessage('ai', 'Please set your Google AI API key in the settings to continue.');
            return;
        }

        try {
            const difficulty = this.calculateDifficulty();
            const prompt = this.createSentencePrompt(difficulty);
            
            const response = await this.callGoogleAI(prompt);
            const sentence = this.extractSentence(response);
            
            this.testState.sentences.push(sentence);
            
            const message = `**Sentence ${this.testState.currentSentence + 1}:**\n\n"${sentence}"\n\nPlease read this sentence aloud clearly.`;
            this.addMessage('ai', message);
            this.speakText(`Sentence ${this.testState.currentSentence + 1}: ${sentence}`);
            
        } catch (error) {
            console.error('Error generating sentence:', error);
            this.addMessage('ai', 'Sorry, I encountered an error generating the sentence. Please try again.');
        }
    }

    calculateDifficulty() {
        if (this.testState.currentSentence === 0) return 'easy';
        
        const averageScore = this.testState.scores.reduce((a, b) => a + b, 0) / this.testState.scores.length;
        
        if (averageScore >= 8) return 'hard';
        if (averageScore >= 6) return 'medium';
        return 'easy';
    }

    createSentencePrompt(difficulty) {
        const difficultyInstructions = {
            easy: 'Generate a simple sentence with common words, focusing on basic pronunciation patterns.',
            medium: 'Generate a moderately challenging sentence with some complex words or sound combinations.',
            hard: 'Generate a challenging sentence with difficult pronunciations, tongue twisters, or complex phonetic patterns.'
        };

        return `You are a pronunciation test generator. ${difficultyInstructions[difficulty]} 
        
        Requirements:
        - Return ONLY the sentence, no additional text
        - Make it educational and practical
        - Ensure it's appropriate for pronunciation practice
        - Length: 8-15 words
        
        Generate a ${difficulty} pronunciation test sentence:`;
    }

    async processPronunciationAttempt(userText, isVoice) {
        const currentSentence = this.testState.sentences[this.testState.currentSentence];
        this.testState.userResponses.push(userText);

        if (!this.apiKey) {
            this.addMessage('ai', 'Please set your Google AI API key in the settings to continue.');
            return;
        }

        try {
            const feedback = await this.analyzePronunciation(currentSentence, userText, isVoice);
            this.addMessage('ai', feedback.message);
            this.speakText(feedback.spokenFeedback);
            
            this.testState.scores.push(feedback.score);
            this.testState.currentSentence++;
            this.updateProgress();

            if (this.testState.currentSentence < this.testState.totalSentences) {
                setTimeout(() => {
                    this.generateNextSentence();
                }, 2000);
            } else {
                setTimeout(() => {
                    this.provideFinalAssessment();
                }, 2000);
            }
        } catch (error) {
            console.error('Error analyzing pronunciation:', error);
            this.addMessage('ai', 'Sorry, I encountered an error analyzing your pronunciation. Please try again.');
        }
    }

    async analyzePronunciation(originalSentence, userText, isVoice) {
        const prompt = `You are an expert pronunciation analyst. Analyze the user's pronunciation attempt.

Original sentence: "${originalSentence}"
User's ${isVoice ? 'spoken' : 'typed'} response: "${userText}"

Provide analysis in this exact format:
SCORE: [number 1-10]
FEEDBACK: [specific feedback about pronunciation accuracy, errors, and improvements]
TIPS: [practical pronunciation tips]

Focus on:
- Accuracy of word pronunciation
- Clarity and fluency
- Common pronunciation errors
- Constructive guidance for improvement

Be encouraging but honest in your assessment.`;

        const response = await this.callGoogleAI(prompt);
        return this.parsePronunciationFeedback(response);
    }

    parsePronunciationFeedback(response) {
        const scoreMatch = response.match(/SCORE:\s*(\d+)/i);
        const feedbackMatch = response.match(/FEEDBACK:\s*(.*?)(?=TIPS:|$)/is);
        const tipsMatch = response.match(/TIPS:\s*(.*?)$/is);

        const score = scoreMatch ? parseInt(scoreMatch[1]) : 7;
        const feedback = feedbackMatch ? feedbackMatch[1].trim() : 'Good effort!';
        const tips = tipsMatch ? tipsMatch[1].trim() : 'Keep practicing!';

        const message = `**Pronunciation Analysis:**\n\n📊 **Score: ${score}/10**\n\n💬 **Feedback:** ${feedback}\n\n💡 **Tips:** ${tips}`;
        const spokenFeedback = `Score: ${score} out of 10. ${feedback}`;

        return { score, message, spokenFeedback };
    }

    async provideFinalAssessment() {
        const averageScore = this.testState.scores.reduce((a, b) => a + b, 0) / this.testState.scores.length;
        const roundedScore = Math.round(averageScore * 10) / 10;

        const prompt = `Provide a comprehensive final assessment for a pronunciation test.

Test Results:
- Total sentences: ${this.testState.totalSentences}
- Individual scores: ${this.testState.scores.join(', ')}
- Average score: ${roundedScore}/10

Provide a final assessment in this format:
OVERALL_SCORE: [rounded average score]/10
FLUENCY: [assessment of overall fluency]
PERFORMANCE: [overall performance summary]
RECOMMENDATIONS: [specific recommendations for improvement]

Be encouraging and provide actionable advice.`;

        try {
            const response = await this.callGoogleAI(prompt);
            const assessment = this.parseFinalAssessment(response, roundedScore);
            
            const finalMessage = `🎉 **Test Complete!**\n\nThank you for completing the pronunciation test. Here is your final feedback:\n\n📊 **Pronunciation Score:** ${assessment.score}/10\n\n🗣️ **Fluency Assessment:** ${assessment.fluency}\n\n⭐ **Overall Performance:** ${assessment.performance}\n\n📚 **Recommendations:** ${assessment.recommendations}`;
            
            this.addMessage('ai', finalMessage);
            this.speakText(`Test complete! Your final pronunciation score is ${assessment.score} out of 10. ${assessment.performance}`);
            
            this.testState.isActive = false;
            this.progressContainer.classList.remove('active');
            
        } catch (error) {
            console.error('Error generating final assessment:', error);
            this.addMessage('ai', `🎉 **Test Complete!**\n\nYour average pronunciation score: ${roundedScore}/10\n\nThank you for completing the test!`);
        }
    }

    parseFinalAssessment(response, fallbackScore) {
        const scoreMatch = response.match(/OVERALL_SCORE:\s*([\d.]+)/i);
        const fluencyMatch = response.match(/FLUENCY:\s*(.*?)(?=PERFORMANCE:|$)/is);
        const performanceMatch = response.match(/PERFORMANCE:\s*(.*?)(?=RECOMMENDATIONS:|$)/is);
        const recommendationsMatch = response.match(/RECOMMENDATIONS:\s*(.*?)$/is);

        return {
            score: scoreMatch ? scoreMatch[1] : fallbackScore,
            fluency: fluencyMatch ? fluencyMatch[1].trim() : 'Good overall fluency',
            performance: performanceMatch ? performanceMatch[1].trim() : 'You showed good pronunciation skills with areas for improvement.',
            recommendations: recommendationsMatch ? recommendationsMatch[1].trim() : 'Continue practicing regularly to improve your pronunciation skills.'
        };
    }

    async callGoogleAI(prompt) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    extractSentence(response) {
        // Clean up the response to extract just the sentence
        return response.replace(/["""]/g, '').trim();
    }

    updateProgress() {
        const progress = (this.testState.currentSentence / this.testState.totalSentences) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `${this.testState.currentSentence}/${this.testState.totalSentences}`;
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Convert markdown-style formatting to HTML
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        contentDiv.innerHTML = formattedContent;
        messageDiv.appendChild(contentDiv);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timeDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    speakText(text) {
        if (this.synthesis) {
            // Cancel any ongoing speech
            this.synthesis.cancel();
            
            // Clean text for speech (remove markdown and special characters)
            const cleanText = text
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .replace(/[📊💬💡🎉🗣️⭐📚]/g, '')
                .replace(/\n/g, ' ');
            
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = parseFloat(this.voiceSpeedSlider.value);
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            // Try to use a female voice if available
            const voices = this.synthesis.getVoices();
            const femaleVoice = voices.find(voice => 
                voice.name.toLowerCase().includes('female') || 
                voice.name.toLowerCase().includes('woman') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('victoria')
            );
            
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }
            
            this.synthesis.speak(utterance);
        }
    }

    resetTest() {
        this.testState = {
            isActive: false,
            currentSentence: 0,
            totalSentences: 5,
            sentences: [],
            scores: [],
            userResponses: []
        };
        
        this.progressContainer.classList.remove('active');
        this.chatMessages.innerHTML = '';
        this.textInput.value = '';
        
        this.showWelcomeMessage();
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PronunciationTestBot();
});