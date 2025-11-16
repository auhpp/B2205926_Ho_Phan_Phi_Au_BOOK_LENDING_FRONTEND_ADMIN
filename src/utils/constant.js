export const BookCopyStatus = {
    available: {
        name: "available",
        desc: "Có sẵn",
        color: "primary"
    },
    borrowed: {
        name: "borrowed",
        desc: "Đang mượn",
        color: "secondary"
    },
    damaged: {
        name: "damaged",
        desc: "Bị hư",
        color: "warning"
    },
    lost: {
        name: "lost",
        desc: "Bị mất",
        color: "danger"
    },
    retired: {
        name: "retired",
        desc: "Ngừng phục vụ",
        color: "dark"
    },
    pending: {
        name: "pending",
        desc: "Chờ duyệt",
        color: "primary"
    },
    approved: {
        name: "approved",
        desc: "Đã duyệt",
        color: "success"
    }
}

export const LoanSlipStatus = {
    pending: {
        name: "pending",
        desc: "Chờ duyệt",
        color: "primary"
    },
    approved: {
        name: "approved",
        desc: "Đã duyệt",
        color: "success"
    },
    borrowed: {
        name: "borrowed",
        desc: "Đang mượn",
        color: "secondary"
    },
    returned: {
        name: "returned",
        desc: "Đã trả",
        color: "primary"
    },
    rejected: {
        name: "rejected",
        desc: "Đã hủy",
        color: "danger"
    }
}


export const LoanDetailStatus = {
    pending: {
        name: "pending",
        desc: "Chờ duyệt",
        color: "primary"
    },
    approved: {
        name: "approved",
        desc: "Đã duyệt",
        color: "success"
    },
    borrowed: {
        name: "borrowed",
        desc: "Đang mượn",
        color: "secondary"
    },
    returned: {
        name: "returned",
        desc: "Đã trả",
        color: "primary"
    },
    damaged: {
        name: "damaged",
        desc: "Bị hư",
        color: "warning"
    },
    lost: {
        name: "lost",
        desc: "Bị mất",
        color: "dark"
    },
    rejected: {
        name: "rejected",
        desc: "Đã hủy",
        color: "danger"
    }
}

export const ConfigurationConstant = {
    DEFAULT_BORROW_DAYS: 'DEFAULT_BORROW_DAYS',
    MAX_BORROW_LIMIT: 'MAX_BORROW_LIMIT',
    DAILY_LATE_FEE: 'DAILY_LATE_FEE',
    LOST_BOOK_PENALTY_RATE: 'LOST_BOOK_PENALTY_RATE',
    DAMAGED_BOOK_PENALTY_RATE: 'DAMAGED_BOOK_PENALTY_RATE'

};

export const PenaltyTicketType = {
    damaged: {
        name: "damaged",
        desc: "Bị hư",
        color: "warning"
    },
    lost: {
        name: "lost",
        desc: "Bị mất",
        color: "dark"
    },
    late: {
        name: "late",
        desc: "Trễ hạn",
        color: "danger"
    }
}

export const PaymentStatus = {
    PAID: {
        name: "PAID",
        desc: "Đã thanh toán",
        color: "success"
    },
    NOT_PAID: {
        name: "NOT_PAID",
        desc: "Chưa thanh toán",
        color: "danger"
    },
}