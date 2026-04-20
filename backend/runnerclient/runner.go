package runnerclient

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type JobRequest struct {
    Image string   `json:"image"`
    Cmd   []string `json:"cmd"`
}

type Client struct {
    URL string
}

func (c *Client) Run(job JobRequest) error {
    b, _ := json.Marshal(job)

    req, err := http.NewRequest("POST", c.URL+"/run", bytes.NewBuffer(b))
    if err != nil {
        return err
    }

    req.Header.Set("Content-Type", "application/json")

    _, err = http.DefaultClient.Do(req)
    return err
}
