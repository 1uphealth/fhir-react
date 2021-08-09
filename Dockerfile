FROM circleci/node

RUN sudo apt-get update
RUN sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN sudo apt-get install python3-venv