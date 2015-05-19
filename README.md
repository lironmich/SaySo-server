# betterFlahCards
server client phonegap project to manage better flahs cards.    

# What is this project?
This project aims to provide a repository + server + smartphone app and web Interface for better flash crads.    

# Why do I need flash cards?    
flash cards are possibly the best way to memorize and learn new Information weather Its a definitions list for an academic course or a list of words for your vocabulary in your native language or a new foreign language.     

# But why "better" flash cards? what's better about them?    
Beside the obvious advantages of digital vs a pile of papers (distributable, doesn't get lost, access from anywhere...)
there is also one GREAT edge. a digital flash card can have more than just 2 sides!    

The basic need for this project came from my attempt to Improve my Arabic vocabulary.    
on every single flash card I would like to have 3 "faces":    
1) A word written in Arabic : شكر    
2) Since my reading in Arabic is far from fluent I also need the Arabic word in letters I can understand. in this case: "Shukran".    
3) The meaning of the word in a langugae I understand in this case : "Thanks".    

If I was to do that with paper flash cards I'd have to either give up on one of those 3 valuesor or I would need 2 seperate
paper cards for each word! the current repository holds some 1500 words so I'd need 1500 PAIRS of cards and each pair has to be kept as a pair. thats just unmanagable.    

The first adat here which is used both as an example and for development purposses is a list of common words in spoken Arabic 
In the Palastinian dialect and the matching meaning in Hebrew. hopefully in the future more people will donate flash cards for
any type of use. SAT words, foreign languages, academic classes terminology etc...

# Technology
the server is a node js server using express for its routing and mongodb + mongoose for the data.
client side is currently html + js and will be wrapped with phonegap.
server will (in the future) run on heroku.

there might be an angular.js managemant app. not to sure yet

# Installation Instruction
1) clone project  
2) cd Into project  
3)npm install  
4)node server.js  
5) on your browser go to 127.0.0.1:8888  
