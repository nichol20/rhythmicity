package utils

type CheckLimitAndOffsetParams struct {
	Limit        *uint32
	Offset       *uint32
	DefaultLimit uint32
}

func CheckLimitAndOffset(arg CheckLimitAndOffsetParams) (limit uint32, offset uint32) {
	var defaultLimit uint32 = arg.DefaultLimit

	if defaultLimit == 0 {
		defaultLimit = 20
	}

	o := uint32(0)
	l := defaultLimit

	if arg.Offset != nil && *arg.Offset > 0 {
		o = *arg.Offset
	}
	if arg.Limit != nil && *arg.Limit > 0 && *arg.Limit < defaultLimit {
		l = *arg.Limit
	}

	return l, o
}
