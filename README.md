![Captain's Log](https://i.pinimg.com/originals/9b/db/9c/9bdb9c09305f4356962bf4c487300d5c.jpg)

# Notes
* Optimized speed of constant resorting by storing all the most current logs from each log source in a heap. 
* Design for the async version is built to deal with large numbers. Only one log from each log source is loaded into memory at at time. This is a bottleneck for speed of processing since after the initial loading of each log, the program effectively can only go as fast as a single popAsync will process. Depending on the speed required and the memory contraints, one could set up a queue for each logSource, preloading a certain number of logs to ease that bottle neck.
