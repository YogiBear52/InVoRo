FROM mongo

COPY import.sh .
COPY Features.json .
COPY mongoInitializer.js .

ENTRYPOINT ["/bin/bash", "/import.sh"]