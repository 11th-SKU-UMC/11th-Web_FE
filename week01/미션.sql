CREATE TABLE `member` (
	`member_id`	BIGINT	NOT NULL,
	`name`	VARCHAR	NULL,
	`id`	VARCHAR	NULL,
	`password`	VARCHAR	NULL,
	`Field`	VARCHAR(255)	NULL,
	`social_id`	BIGINT	NOT NULL
);

CREATE TABLE `social_login` (
	`social_id`	BIGINT	NOT NULL,
	`flatform`	VARCHAR	NULL,
	`name`	VARCHAR	NULL,
	`id`	VARCHAR	NULL
);

CREATE TABLE `store` (
	`store_id`	BIGINT	NOT NULL,
	`store_name`	VARCHAR	NULL,
	`menu`	VARCHAR	NULL,
	`call_number`	BIGINT	NULL,
	`address`	VARCHAR	NULL
);

CREATE TABLE `mission_list` (
	`mission_list_id`	BIGINT	NOT NULL,
	`store_name`	VARCHAR	NULL,
	`store_id`	BIGINT	NOT NULL
);

CREATE TABLE `conpleted_mission` (
	`completed_mission_id`	BIGINT	NOT NULL,
	`store_name`	VARCHAR	NULL,
	`completed`	BOOLEAN	NULL,
	`Field`	VARCHAR(255)	NULL,
	`member_id`	BIGINT	NOT NULL,
	`mission_list_id`	BIGINT	NOT NULL
);

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
	`member_id`
);

ALTER TABLE `social_login` ADD CONSTRAINT `PK_SOCIAL_LOGIN` PRIMARY KEY (
	`social_id`
);

ALTER TABLE `store` ADD CONSTRAINT `PK_STORE` PRIMARY KEY (
	`store_id`
);

ALTER TABLE `mission_list` ADD CONSTRAINT `PK_MISSION_LIST` PRIMARY KEY (
	`mission_list_id`
);

ALTER TABLE `conpleted_mission` ADD CONSTRAINT `PK_CONPLETED_MISSION` PRIMARY KEY (
	`completed_mission_id`
);

