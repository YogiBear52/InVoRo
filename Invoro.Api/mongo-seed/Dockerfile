FROM mongo

COPY import.sh .
COPY Features.json .

ENTRYPOINT ["sh", "/import.sh"]