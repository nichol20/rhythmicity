package domain

type User struct {
	ID       int32  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type SensitiveUser struct {
	User
	Password string
}
